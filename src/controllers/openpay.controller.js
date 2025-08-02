import { createOrUpdateOpenPayCustomerService, createChargeService } from '../services/openpay.service.js';

export const createCustomer = async (req, res) => {
  try {
    const { anonymousId, name, lastName, email, phone, address } = req.body
    const customer = await createOrUpdateOpenPayCustomerService({ anonymousId, name, lastName, email, phone, address })
    res.status(200).json(customer)
  } catch (err) {
    console.error('❌ Error en createCustomer:', err)
    const message = err?.description || err?.message || 'Error inesperado al crear cliente'
    res.status(500).json({ message })
  }
};

export const createCharge = async (req, res) => {
  try {
    const { anonymousId, tokenIdOpenPay } = req.body
    const charge = await createChargeService({ anonymousId, tokenIdOpenPay })
    res.status(200).json(charge)
  } catch (err) {
    console.error('❌ Error al crear cargo:', err)
    const message = err?.description || err?.message || 'Error inesperado al crear el cargo'
    res.status(500).json({ message })
  }
}

