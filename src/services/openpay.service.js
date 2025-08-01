import axios from 'axios'
import { AnonymousCustomer } from '../models/anonymousCustomer.model.js'
import { Cart } from '../models/cart.model.js'
import { generateOrderServices } from './order.service.js'
import {
  getSkydropxQuoteService,
  getQuotationDetailsByIdService,
  createSkydropxShipmentService
} from '../services/skydropx.service.js'

const BASE_URL = 'https://sandbox-api.openpay.mx/v1'
const MERCHANT_ID = process.env.OPENPAY_MERCHANT_ID
const PRIVATE_KEY = process.env.OPENPAY_PRIVATE_KEY

const openpayClient = axios.create({
  baseURL: `${BASE_URL}/${MERCHANT_ID}`,
  auth: {
    username: PRIVATE_KEY,
    password: '',
  },
  headers: {
    'Content-Type': 'application/json',
  },
})

// Crear cliente
export const createOpenPayCustomerService = async ({ anonymousId, name, email, phone, address }) => {
  const existing = await AnonymousCustomer.findOne({ anonymousId })
  if (existing) return existing

  const payload = {
    name,
    email,
    phone_number: phone,
    requires_account: false,
    address,
  }

  const response = await openpayClient.post('/customers', payload)

  const saved = await AnonymousCustomer.create({
    anonymousId,
    openpayCustomerId: response.data.id,
    name,
    email,
    phone,
    address,
  })

  return saved
}

// Crear cargo + orden + envío con cotización
export const createChargeService = async ({ anonymousId, tokenIdOpenPay }) => {
  const customer = await AnonymousCustomer.findOne({ anonymousId })
  if (!customer) throw new Error('Cliente no encontrado')

  const cart = await Cart.findOne({ anonymousId })
  if (!cart || cart.totalToPay <= 0) throw new Error('Carrito vacío o sin monto')

  const amount = Number(cart.totalToPay.toFixed(2))

  // 👉 1. Crear el cargo
  const payload = {
    method: 'card',
    source_id: tokenIdOpenPay,
    amount,
    currency: 'MXN',
    description: 'Compra en EnUnaOptica',
    order_id: `ORD-${Date.now()}`,
    device_session_id: 'xxx',
  }

  const response = await openpayClient.post(
    `/customers/${customer.openpayCustomerId}/charges`,
    payload
  )

  if (response.data.status !== 'completed') {
    throw new Error(`El pago fue rechazado o no se completó: ${response.data.status}`)
  }

  // 👉 2. Crear orden interna anticipadamente para generar orderId
  const tempOrder = await generateOrderServices({
    sessionId: anonymousId,
    products: cart.productItems,
    orderStatus: 'paid',
    totalAmount: cart.totalToPay,
    shippingInfo: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      street: customer.address?.line1 || '',
      city: customer.address?.city || '',
      state: customer.address?.state || '',
      postalCode: customer.address?.postal_code || '',
      aditionalReferents: customer.address?.line2 || ''
    },
    shippingData: {} // será llenado después
  })

  // 👉 3. Cotizar envío con quotation preliminar
  const quotation = await getSkydropxQuoteService({
    country_code: 'mx',
    postal_code: customer.address?.postal_code || '',
    area_level1: customer.address?.state || '',
    area_level2: customer.address?.city || '',
    area_level3: customer.address?.line2 || '',
  })

  // 👉 4. Confirmar la cotización
  const confirmedQuotation = await getQuotationDetailsByIdService(quotation.id, tempOrder._id.toString())

  const validRates = confirmedQuotation.rates?.filter(r => r.success) || []
  if (validRates.length === 0) {
    throw new Error('No se encontraron tarifas válidas para envío')
  }

  // 👉 5. Seleccionar mejor tarifa
  const bestRate = validRates.sort((a, b) => parseFloat(a.total) - parseFloat(b.total))[0]

  // 👉 6. Actualizar orden con la tarifa
  tempOrder.shippingData = {
    selected_rate: bestRate,
    quotation_id: quotation.id
  }
  await tempOrder.save()

  // 👉 7. Crear envío real
  const shipment = await createSkydropxShipmentService(tempOrder._id)
  tempOrder.shippingData.shipment = shipment
  await tempOrder.save()

  return {
    charge: response.data,
    orderId: tempOrder._id,
    shipment
  }
}
