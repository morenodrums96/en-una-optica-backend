import { getAllOrderServices, generateOrderServices, orderPaginationServices } from '../services/order.service.js';

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
        await generateOrderServices(orderInfor, addressInformation);
    } catch (error) {
        console.error('Error al generar orden:', error);
        res.status(500).json({ message: 'Error del servidor favor de mandar un mensaje.' });
    }

};

export const orderPagination = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 12);
    const status = req.query.status; // puede ser 'paid', 'pending', etc.

    const { result, total } = await orderPaginationServices(page, limit, status);

    res.json({
      result,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error en la paginación orderPagination:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
