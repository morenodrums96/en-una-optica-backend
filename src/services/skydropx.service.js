import { getCachedToken } from '../services/skydropxTokenCache.service.js';
import { Order } from "../models/order.model.js";

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
    const token = '6f0fD5qt7cJE2pgXiHNgpzJVHm8iGiDuwUV5Ks8pYRE';//await getSkydropxTokenService();

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

export const getSkydropxQuotationByIdService = async (quotationId, orderId) => {
  try {
    const token = await getSkydropxTokenService();

    const response = await axios.get(
      `https://sb-pro.skydropx.com/api/v1/quotations/${quotationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const rates = response.data.rates || [];

    const validRates = rates.filter(rate => rate.success === true && rate.total);
    if (validRates.length === 0) {
      throw new Error('No hay cotizaciones exitosas disponibles');// Guardar en la orden el numero de cotizacion para hacecrla manualemnte 
    }

    validRates.forEach(rate => {
      rate.numericTotal = parseFloat(rate.total);
    });

    validRates.sort((a, b) => {
      if (a.numericTotal !== b.numericTotal) {
        return a.numericTotal - b.numericTotal;
      }
      return a.days - b.days;
    });
    const rangos = [100, 150, 200, 250, 300];
    let mejorOpcion = null;

    for (const limite of rangos) {
      mejorOpcion = validRates.find(rate => rate.numericTotal <= limite);
      if (mejorOpcion) break;
    }

    if (!mejorOpcion) {
      mejorOpcion = validRates[0];
    }

    const filter = {
      orderStatus: 'paid',
      ...(customerId ? { customerId } : { sessionId })
    };

    let order = await Order.findOne(orderId);


    const envio = await axios.post(
      'https://sb-pro.skydropx.com/api/v1/shipments',
      {
        shipment: {
          rate_id: mejorOpcion.id,
          address_from: {
            name: "En Una Óptica",
            email: "contacto@enunaoptica.com",
            phone: "5560670561",
            street1: "Río Pánuco #183",
            city: "Cuauhtémoc",
            state: "Ciudad de México",
            country: "MX",
            zip: "06500",
            reference: "Sucursal CDMX"
          },
          address_to: {
            name: order.shippingInfo.name,
            email: order.correo,
            phone: order.cellphone,
            street1: order.shippingInfo.street,
            city: order.shippingInfo.city,
            state: order.shippingInfo.state,
            country: "MX",
            zip: order.shippingInfo.postalCode,
            reference: order.shippingInfo.aditionalReferents
          },
          parcels: [
            {
              length: 20,
              width: 15,
              height: 10,
              weight: 1.5,
              content: "Lentes ópticos"
            }
          ],
          type: "delivery",
          external_order_id: "ORD-TEST-001",
          consignment_note: "31241501",
          package_type: "4G"
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      quotation_id: quotationId,
      selected_rate: mejorOpcion,
      shipment: envio.data
    };

  } catch (error) {
    console.error('❌ Error en servicio Skydropx GET Quotation:', error.response?.data || error.message);
    throw new Error('No se pudo obtener la cotización');
  }
};