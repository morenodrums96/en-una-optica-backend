import { getAllOrderServices, generateOrderServices, orderPaginationServices, completeOrderServices,removeProductFromOrderService } from '../services/order.service.js';

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
    const order = await generateOrderServices(req.body);

    res.status(201).json({
      message: 'orden registrada correctamente',
      order
    });
  } catch (error) {
    console.error('Error en generateOrder:', error);
    res.status(500).json({ message: 'Error del servidor. Favor de mandar un mensaje.' });
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
    console.error('Error en el orderPagination:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const completeOrder = async (req, res) => {
  try {
    const updated = await completeOrderServices(req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }
    res.status(201).json({ message: 'Orden completada correctamente' });
  } catch (error) {
    console.error('Error en el completeOrder:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const removeProductFromOrder = async (req, res) => {
  try {
    const { orderId, productIdInterno } = req.params;
    const updatedOrder = await removeProductFromOrderService(orderId, productIdInterno);

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Orden o producto no encontrados' });
    }

    res.json({
      message: 'Producto eliminado correctamente de la orden',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error al eliminar producto de la orden:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
