import OpenPay from 'openpay';
import { Customer } from '../models/customer.model.js';
import dotenv from 'dotenv';
dotenv.config();

const openpay = new OpenPay(
  process.env.OPENPAY_MERCHANT_ID,
  process.env.OPENPAY_PRIVATE_KEY,
  false // true para sandbox, false para producción
);

openpay.setTimeout(20000);

export const createOpenPayCustomerService = async (customerId) => {
  const localCustomer = await Customer.findById(customerId);

  if (!localCustomer) {
    throw new Error('Cliente no encontrado en la base de datos');
  }

  const customerData = {
    name: localCustomer.name,
    last_name: localCustomer.secondLastName || '',
    email: localCustomer.email,
    phone_number: localCustomer.cellphone || '',
    requires_account: false
  };

  return new Promise((resolve, reject) => {
    openpay.customers.create(customerData, async (error, createdCustomer) => {
      if (error) {
        console.error('❌ Error creando cliente en OpenPay:', error);
        return reject(error);
      }

      // 🧠 Guardar el ID en la base local
      localCustomer.openpayCustomerId = createdCustomer.id;
      await localCustomer.save();

      resolve(createdCustomer);
    });
  });
};

export default openpay;
