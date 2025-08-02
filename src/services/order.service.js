import { Order } from "../models/order.model.js";
import { Product } from '../models/product.model.js';

export const getAllOrderServices = async () => {
  const orders = await Order.find();
  return orders;
};

export const generateOrderServices = async ({
  sessionId,
  customerId,
  products,
  orderStatus,
  shippingInfo,
  totalAmount,
  shippingData = {}
}) => {
  const newOrder = await Order.create({
    sessionId,
    customerId,
    orderStatus,
    orderIsSent: 'house',
    paymentMethod: 'card',
    products,
    totalAmount: totalAmount,
    correo: shippingInfo?.email,
    cellphone: shippingInfo?.phone,
    shippingInfo: {
      name: shippingInfo?.name || '',
      lastName: shippingInfo?.lastName || '',
      street: shippingInfo?.street || '',
      externalNumber: shippingInfo?.externalNumber || '',
      internalNumber: shippingInfo?.internalNumber || '',
      postalCode: shippingInfo?.postalCode || '',
      neighborhood: shippingInfo?.neighborhood || '',
      city: shippingInfo?.city || '',
      state: shippingInfo?.state || '',
      aditionalReferents: shippingInfo?.aditionalReferents || '',
    },

    shippingData,
    logs: [],
  })

  // 👇 Aquí se corrige el uso de cart.productItems
  await updateStockAfterOrder(products)

  // Agregar log del sistema
  addOrderLog(newOrder, {
    action: 'created',
    message: 'Orden creada desde carrito de compras',
    metadata: {
      source: customerId ? 'customer' : 'guest',
      totalAmount: Math.round(totalAmount * 100) / 100
    },
  })

  await newOrder.save()
  return newOrder
}


export const addOrderLog = (order, { action, message, metadata = {}, performedBy = 'system' }) => {
  order.logs.push({
    action,
    message,
    metadata,
    performedBy,
    timestamp: new Date()
  });
};

export const updateStockAfterOrder = async (products) => {
  for (const item of products) {
    const product = await Product.findById(item.productId)
    if (!product) continue

    const { quantity } = item

    // Buscar la variante correcta (si tienes un sistema para identificarla)
    const variantIndex = product.variants.findIndex(v =>
      item.configurableOptions?.some(group =>
        group.options?.some(opt => v.color.toString() === opt._id?.toString())
      )
    )

    if (variantIndex !== -1) {
      product.variants[variantIndex].quantity = Math.max(
        0,
        product.variants[variantIndex].quantity - quantity
      )
    }

    product.sales += quantity
    await product.save()
  }
}



export const getOrderByIdServices = async (id) => {
  const order = await Order.findById(id)
    .populate('products.productId')
    .lean();

  return order;
};