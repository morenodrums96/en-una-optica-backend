import { Order } from "../models/order.model.js";
import { Product } from '../models/product.model.js';
import { ConfigurableOption } from '../models/configurableOption.model.js';


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
      secondName: shippingInfo?.secondName || '',
      secondLastName: shippingInfo?.secondLastName || '',
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

export const enrichConfigurableOptions = async (configSelections = []) => {
  const enriched = [];
  let subtotal = 0;

  for (const selection of configSelections) {
    const group = await ConfigurableOption.findById(selection.groupId);
    if (!group || !group.enabled) continue;

    const enrichedGroup = {
      groupName: group.group,
      options: []
    };

    for (const optId of selection.optionIds) {
      const option = group.options.find(o => o._id.toString() === optId);
      if (!option || !option.enabled) continue;

      subtotal += option.price;

      const enrichedOption = {
        name: option.name,
        price: option.price,
        colors: []
      };

      const colorsForOption = selection.selectedColors?.filter(
        sc => sc.optionId === optId
      ) || [];

      for (const colorSel of colorsForOption) {
        const matchedColor = option.availableColors.find(
          c => c._id.toString() === colorSel.colorId
        );
        if (matchedColor && matchedColor.enabled) {
          enrichedOption.colors.push({
            name: matchedColor.name,
            hex: matchedColor.hex
          });
        }
      }

      enrichedGroup.options.push(enrichedOption);
    }

    if (enrichedGroup.options.length > 0) {
      enriched.push(enrichedGroup);
    }
  }

  return { enriched, subtotal };
};








export const orderPaginationServices = async (page = 1, limit = 12, status) => {
  const skip = (page - 1) * limit;

  const query = {};

  if (status) {
    query.orderStatus = status;
  }

  const order = await Order.find(query)
    .sort({ createdAt: -1 }) // más recientes primero
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments(query);

  return { order, total };
};

export const completeOrderServices = async ({ customerId, sessionId, ...data }) => {
  let filter = { orderStatus: 'pending' };

  if (customerId) {
    filter = { customerId };
  } else if (sessionId) {
    filter = { sessionId };
  } else {
    return null;
  }

  const updatedOrder = await Order.findOneAndUpdate(
    filter,
    { $set: data },
    { new: true }
  ).select('_id totalAmount');

  return updatedOrder;
};

export const removeProductFromOrderService = async (orderId, productIdInterno) => {
  const order = await Order.findOne({ _id: orderId, orderStatus: 'pending' });
  if (!order) return null;

  order.products = order.products.filter(p => p._id.toString() !== productIdInterno);

  let newTotal = 0;
  for (const p of order.products) {
    newTotal += p.unitPrice * p.quantity;
  }

  order.totalAmount = Math.round(newTotal * 100) / 100;

  await order.save();
  return order;
};

export const getbyClientServices = async ({ sessionId, customerId }) => {
  const filter = {
    orderStatus: 'pending',
    ...(customerId ? { customerId } : { sessionId })
  };

  const order = await Order.find(filter).populate('products.productId', 'name brand image customerPrice variants.image canModifyQuantity');
  return order;
};


export const updateQuantityOrderService = async ({ customerId, sessionId, products }) => {
  const filter = {
    orderStatus: 'pending',
    ...(customerId ? { customerId } : { sessionId })
  };

  const order = await Order.findOne(filter);
  if (!order) throw new Error('Orden no encontrada');

  let totalAmount = 0;
  const updatedProducts = [];

  for (const item of products) {
    const existingProduct = order.products.id(item.products_id);
    if (!existingProduct) continue;

    const quantity = item.quantity || 1;
    const basePrice = existingProduct.customerPriceFrond || 0;

    // Sumar configuraciones
    let configPrice = 0;

    for (const group of existingProduct.configurableOptions || []) {
      for (const opt of group.options || []) {
        configPrice += opt.price || 0;
      }
    }

    // Total por producto considerando cantidad y configuraciones
    const totalByProduct = (basePrice + configPrice) * quantity;
    totalAmount += totalByProduct;

    // Guardar actualizaciones
    existingProduct.quantity = quantity;
    existingProduct.totalByProduct = Math.round(totalByProduct * 100) / 100;

    updatedProducts.push(existingProduct);
  }

  // Reemplazar productos actualizados y guardar el nuevo total general
  order.products = updatedProducts;
  order.totalAmount = Math.round(totalAmount * 100) / 100;

  await order.save();
  return order;
};
