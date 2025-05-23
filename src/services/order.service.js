import { Order } from "../models/order.model.js";
import { Customer } from "../models/customer.model.js";
import { Address } from "../models/address.model.js";
import { Product } from '../models/product.model.js';


export const getAllOrderServices = async () => {
  const orders = await Order.find();
  return orders;
};

// export const generateOrderServices = async (orderInfor, addressInformation) => {
//     const customerEmail = orderInfor.email;
//     let customeExists = await Customer.findOne({ email: customerEmail });

//     if (!customeExists) {
//         const information = {
//             name: orderInfor.name,
//             secondName: orderInfor.secondName,
//             secondLastName: orderInfor.secondLastName,
//             cellphone: orderInfor.cellphone,
//             email: orderInfor.email,
//             isGuest: true,
//         };

//         customeExists = await Customer.create(information);
//     }
//     addressInformation.customerId = customeExists._id;
//     await Address.create(addressInformation);
//     orderInfor.customerId = customeExists._id;
//     await Order.create(orderInfor);

// };


export const generateOrderServices = async (orderInfo) => {
  const { sessionId, customerId, products } = orderInfo;

  const filter = {
    orderStatus: 'pending',
    ...(customerId ? { customerId } : { sessionId })
  };

  let order = await Order.findOne(filter);

  const productIds = products.map(p => p.productId);
  const realProducts = await Product.find({ _id: { $in: productIds } });

  let totalAmount = 0;

  const enrichedProducts = products.map(p => {
    const real = realProducts.find(rp => rp._id.toString() === p.productId.toString());
    const unitPrice = real?.customerPrice || 0;
    const lineTotal = unitPrice * p.quantity;
    totalAmount += lineTotal;

    return {
      productId: p.productId,
      quantity: p.quantity,
      unitPrice
    };
  });

  const roundedTotal = Math.round(totalAmount * 100) / 100;

  if (order) {
    order.products.push(...enrichedProducts);
    order.totalAmount = Math.round((order.totalAmount + totalAmount) * 100) / 100;
    await order.save();
    return order;
  } else {
    const newOrder = await Order.create({
      ...orderInfo,
      products: enrichedProducts,
      totalAmount: roundedTotal
    });
    return newOrder;
  }
};




export const orderPaginationServices = async (page = 1, limit = 12, status) => {
  const skip = (page - 1) * limit;

  const query = {};

  if (status) {
    query.orderStatus = status;
  }

  const result = await Order.find(query)
    .sort({ createdAt: -1 }) // más recientes primero
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments(query);

  return { result, total };
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
  );

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

//pendientes cuando le den en graduar configurar todo y que se agregue en la orden // it('carrito de compra por session', async () => {
  //Despues en esa pantalla que puedan aumentar o disminuir la cantidad de lentes si no estan graduados o no tienen configuraciones las cuales tenga aumento valla si tiene aumento que no se pueda subir o bajar la cantidad
  // si no tiene aumento que si y que ahi mismo agreguen toda la informacion no te la compliques para que se genere toda la orden completa y cuando le den enviar ya solo sea la tarjeta y el backen haga los camculos con el backend
  //Agregar candado para que el frond no pueda mandar un campo de monto o algo asi y planchen el monto que calculamos