import { getSkydropxTokenService, getSkydropxQuoteService, getSkydropxQuotationByIdService } from '../services/skydropx.service.js';

export const getToken = async (req, res) => {
  try {
    const token = await getSkydropxTokenService();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuotation = async (req, res) => {
  try {
    const quotations = await getSkydropxQuoteService(req.body);

    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuotationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId } = req.query; 
    const data = await getSkydropxQuotationByIdService(id,orderId);
    res.status(200).json(data);
  } catch (error) {
    console.error('❌ Error obteniendo cotización por ID:', error.message);
    res.status(500).json({ message: error.message });
  }
};