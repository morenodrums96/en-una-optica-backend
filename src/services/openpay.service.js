import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const Openpay = require('openpay')

const openpay = new Openpay(
  process.env.OPENPAY_MERCHANT_ID,
  process.env.OPENPAY_PRIVATE_KEY,
  true // sandbox mode
)

openpay.setTimeout(20000)

console.log('🧪 Validando openpay.tokens:', typeof openpay.tokens) // 👈 Esto debería decir "function"

export const createTokenWithOpenPay = (cardData) => {
  return new Promise((resolve, reject) => {
    if (!openpay.tokens) {
      console.error('❌ openpay.tokens es undefined')
      return reject(new Error('openpay.tokens está mal configurado'))
    }

    openpay.tokens.create(
      cardData,
      (response) => {
        const tokenId = response.id
        resolve({ tokenId })
      },
      (error) => {
        console.error('❌ Error al generar token en servicio OpenPay:', error)
        reject(new Error(error.description || 'No se pudo generar el token'))
      }
    )
  })
}



export const createOpenPayCustomerService = async (customerId, sessionId) => {
  let customerData;
  let openpayCustomerId;

  if (customerId) {
    const localCustomer = await Customer.findById(customerId);

    if (!localCustomer) {
      throw new Error('Cliente no encontrado en la base de datos');
    }

    // Ya tiene OpenPay ID
    if (localCustomer.openpayCustomerId) {
      return localCustomer.openpayCustomerId;
    }

    // Datos para OpenPay
    customerData = {
      name: localCustomer.name,
      last_name: localCustomer.secondLastName || '',
      email: localCustomer.email,
      phone_number: localCustomer.cellphone || '',
      requires_account: false
    };

    // Crear cliente en OpenPay
    openpayCustomerId = await createAndStoreOpenPayCustomer(customerData);

    localCustomer.openpayCustomerId = openpayCustomerId;
    await localCustomer.save();

    return openpayCustomerId;
  }

  if (sessionId) {
    const order = await Order.findOne({ sessionId });

    if (!order) {
      throw new Error('Orden no encontrada con ese sessionId');
    }

    if (order.openpayCustomerId) {
      return order.openpayCustomerId;
    }

    const { correo, cellphone, shippingInfo } = order;

    customerData = {
      name: shippingInfo?.name || '',
      last_name: shippingInfo?.secondLastName || '',
      email: correo || '',
      phone_number: cellphone || '',
      requires_account: false
    };

    openpayCustomerId = await createAndStoreOpenPayCustomer(customerData);

    order.openpayCustomerId = openpayCustomerId;
    await order.save();

    return openpayCustomerId;
  }

  throw new Error('Debes proporcionar un customerId o sessionId');
};

const createAndStoreOpenPayCustomer = (customerData) => {
  return new Promise((resolve, reject) => {
    openpay.customers.create(customerData, (error, createdCustomer) => {
      if (error) {
        console.error('❌ Error creando cliente en OpenPay:', error);
        return reject(error);
      }
      resolve(createdCustomer.id);
    });
  });
};

export default openpay;


export const createOpenPayChargeService = async ({ tokenId, deviceSessionId, openpayCustomerId, description, orderId }) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Orden no encontrada');
  if (order.orderStatus !== 'pending') throw new Error('La orden ya ha sido procesada');

  // ✅ Validar stock antes de cobrar
  for (const productOrder of order.products) {
    const product = await Product.findById(productOrder.productId);
    if (!product) throw new Error(`Producto no encontrado: ${productOrder.productId}`);

    if (product.quantity < productOrder.quantity) {
      throw new Error(`Stock insuficiente para el producto ${product.name}`);
    }
  }

  // ✅ Realizar cargo en OpenPay
  const chargeRequest = {
    source_id: tokenId,
    method: 'card',
    amount: parseFloat(order.totalAmount),
    currency: 'MXN',
    description: description || 'Compra en En Una Óptica',
    device_session_id: deviceSessionId
  };

  const charge = await createOpenPayCharge(openpayCustomerId, chargeRequest);

  // ✅ Descontar stock y actualizar ventas
  for (const productOrder of order.products) {
    const product = await Product.findById(productOrder.productId);
    product.quantity = Math.max(0, product.quantity - productOrder.quantity);
    product.sales = (product.sales || 0) + productOrder.quantity;
    await product.save();
  }

  // ✅ Marcar orden como pagada
  order.orderStatus = 'paid';
  order.paymentMethod = 'card';
  order.paymentIntentId = charge.id;
  await order.save();
  order.logs.push({
    action: 'payment_success',
    message: 'Pago procesado exitosamente vía OpenPay',
    metadata: {
      paymentIntentId: charge.id,
      amount: charge.amount,
      currency: charge.currency,
      authorization: charge.authorization
    },
    performedBy: 'system'
  });

  await order.save(); // vuelve a guardar con el log incluido


  return charge;
};


const createOpenPayCharge = (customerId, chargeRequest) => {
  return new Promise((resolve, reject) => {
    openpay.customers.charges.create(customerId, chargeRequest, (error, charge) => {
      if (error) return reject(error);
      resolve(charge);
    });
  });
};
