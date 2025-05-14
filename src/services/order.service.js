import { Order } from "../models/order.model.js";


export const getAllOrderServices = async () => {
    const orders = await Order.find();
    return orders;
};