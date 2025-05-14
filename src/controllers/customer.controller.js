import { getAllCustomersService, getFavoritesService, postFavoritesService } from '../services/customer.service.js';

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await getAllCustomersService();
        res.json(customers);
    } catch (error) {
        console.error('Error al obtener customers: ', error);
        res.status(500).json({ message: 'Error del servidor' });
    }

};

// GET /api/customers/:id/favorites       ← obtener favoritos
// POST /api/customers/:id/favorites      ← agregar un favorito
// DELETE /api/customers/:id/favorites/:productId ← quitar un favorito

export const getFavorites = async (req, res) => {
    try {
        const customer = await getFavoritesService(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.json(customer.favorites);
    } catch (error) {
        console.error('Error al obtener favoritos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const postFavorites = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Falta el ID del producto' });
        }

        const updatedCustomer = await postFavoritesService(req.params.id, productId);

        res.json({
            message: 'Favoritos actualizados',
            favorites: updatedCustomer.favorites
        });
    } catch (error) {
        console.error('Error al guardar favoritos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

