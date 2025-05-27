import { createOpenPayCustomerService, createOpenPayChargeService } from '../services/openpay.service.js';

export const createCustomer = async (req, res) => {
  try {
    const { customerId, sessionId } = req.body;

    const openpayCustomerId = await createOpenPayCustomerService(customerId, sessionId);

    res.status(201).json({ message: 'Cliente creado en OpenPay', openpayCustomerId });
  } catch (error) {
    console.error('Error al crear cliente en OpenPay:', error);
    res.status(500).json({ message: 'Error al crear cliente en OpenPay' });
  }
};


export const createCharge = async (req, res) => {
  try {
    const { tokenId, deviceSessionId, openpayCustomerId, description ,orderId} = req.body;

    const charge = await createOpenPayChargeService({
      tokenId,
      deviceSessionId,
      openpayCustomerId,
      description,
      orderId
    });

    res.status(201).json({ message: 'Pago realizado con éxito', charge });
  } catch (error) {
    console.error('Error al procesar el pago con OpenPay:', error);
    res.status(500).json({ message: 'Error al procesar el pago' });
  }
};