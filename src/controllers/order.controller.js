import { getAllOrderServices, generateOrderServices } from '../services/order.service.js';

export const getAllOrders = async (req, res) => {
    try {
        const orders = await getAllOrderServices();
        res.json(orders);
    } catch (error) {
        console.error('Error al obtener ordenes:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }

};

export const generateOrder = async (req, res) => {
    try {
    const { orderInfor, addressInformation } = req.body;
        await generateOrderServices(orderInfor,addressInformation);
    } catch (error) {
        console.error('Error al generar orden:', error);
        res.status(500).json({ message: 'Error del servidor favor de mandar un mensaje.' });
    }

};