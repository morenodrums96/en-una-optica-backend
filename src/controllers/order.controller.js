import { getAllOrderServices,getOrderByIdServices } from '../services/order.service.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrderServices();
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener ordenes:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }

};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderByIdServices(id);

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error al obtener orden:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};