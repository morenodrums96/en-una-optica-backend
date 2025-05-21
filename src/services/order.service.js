import { Order } from "../models/order.model.js";
import { Customer } from "../models/customer.model.js";
import { Address } from "../models/address.model.js";


export const getAllOrderServices = async () => {
    const orders = await Order.find();
    return orders;
};

export const generateOrderServices = async (orderInfor, addressInformation) => {
    const customerEmail = orderInfor.email;
    let customeExists = await Customer.findOne({ email: customerEmail });

    if (!customeExists) {
        const information = {
            name: orderInfor.name,
            secondName: orderInfor.secondName,
            secondLastName: orderInfor.secondLastName,
            cellphone: orderInfor.cellphone,
            email: orderInfor.email,
            isGuest: true,
        };

        customeExists = await Customer.create(information);
    }
    addressInformation.customerId = customeExists._id;
    await Address.create(addressInformation);
    orderInfor.customerId = customeExists._id;
    await Order.create(orderInfor);

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
