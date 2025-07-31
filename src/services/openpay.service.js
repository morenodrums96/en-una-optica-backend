import axios from 'axios'
import { AnonymousCustomer } from '../models/anonymousCustomer.model.js'
import { Cart } from '../models/cart.model.js'

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

// Crear cargo
export const createChargeService = async ({ anonymousId, tokenIdOpenPay }) => {
  const customer = await AnonymousCustomer.findOne({ anonymousId })
  if (!customer) throw new Error('Cliente no encontrado')

  const cart = await Cart.findOne({ anonymousId })
  if (!cart || cart.totalToPay <= 0) throw new Error('Carrito vacío o sin monto')

  const amount = Number(cart.totalToPay.toFixed(2))

  const payload = {
    method: 'card',
    source_id: tokenIdOpenPay,
    amount,
    currency: 'MXN',
    description: 'Compra en EnUnaOptica',
    order_id: `ORD-${Date.now()}`,
    device_session_id: 'xxx', // Si tienes Openpay.js puedes obtenerlo
  }

  const response = await openpayClient.post(`/customers/${customer.openpayCustomerId}/charges`, payload)

  return response.data
}
