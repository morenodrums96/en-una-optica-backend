import { createOpenPayCustomerService } from '../services/openpay.service.js';

export const createCustomer = async (req, res) => {
  try {
    const { customerId } = req.body;

    await createOpenPayCustomerService(customerId);

    res.status(201).json({ message: 'Cliente creado en OpenPay' });
  } catch (error) {
    console.error('Error al crear cliente en OpenPay:', error);
    res.status(500).json({ message: 'Error al crear cliente en OpenPay' });
  }
};
