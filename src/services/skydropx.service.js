import { getCachedToken } from '../services/skydropxTokenCache.service.js';

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getSkydropxTokenService = async () => {
  return await getCachedToken(async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.SKYDROPX_API_KEY);
    params.append('client_secret', process.env.SKYDROPX_SECRET_KEY);

    const response = await axios.post(
      'https://sb-pro.skydropx.com/api/v1/oauth/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data.access_token;
  });
};


export const getSkydropxQuoteService = async (quotationData) => {
  try {
    const token = 'IB75Ah_4tlpm-AW4FmJXy25TnNpPVxWLd5Vnn7QZrvk';//await getSkydropxTokenService();

    const response = await axios.post(
      'https://sb-pro.skydropx.com/api/v1/quotations',
      { quotation: quotationData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('❌ Error cotizando en SkydropX:', error.response?.data || error.message);
    throw new Error('No se pudo obtener la cotización de envío');
  }
};

export const getSkydropxQuotationByIdService = async (quotationId) => {
  try {
    const token = 'IB75Ah_4tlpm-AW4FmJXy25TnNpPVxWLd5Vnn7QZrvk';//await getSkydropxTokenService();

    const response = await axios.get(
      `https://sb-pro.skydropx.com/api/v1/quotations/${quotationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('❌ Error en servicio Skydropx GET Quotation:', error.response?.data || error.message);
    throw new Error('No se pudo obtener la cotización');
  }
};