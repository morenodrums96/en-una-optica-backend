import { getAllOrderServices } from '../services/order.service.js';

export const getAllOrders = async (req, res) => {
    try {
        const orders = await getAllOrderServices();
        res.json(orders);
    } catch (error) {
        console.error('Error al obtener ordenes:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }

}