import {
    getAllCustomersService, getFavoritesService, postFavoritesService,
    postGuestFavoriteServices, getGuestFavoriteServices, postMergeGuestFavoritesServices
} from '../services/customer.service.js';

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

export const postGuestFavorite = async (req, res) => {
    const { sessionId, productId } = req.body;

    if (!sessionId || !productId) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    try {
        await postGuestFavoriteServices(sessionId, productId);
        res.status(200).json({ message: 'Favorito guardado' });
    } catch (error) {
        console.error('Error en el postGuestFavorite:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const getGuestFavorite = async (req, res) => {
    try {
        const sessionId = req.params.sessionId;
        const data = await getGuestFavoriteServices(sessionId);

        if (!data) {
            return res.status(404).json({ message: 'No se encontraron favoritos' });
        }

        res.json(data.favorites);
    } catch (error) {
        console.error('Error obteniendo getGuestFavorite:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const postMergeGuestFavorites = async (req, res) => {
    const { sessionId, userId } = req.body;

    if (!sessionId || !userId) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    try {
        await postMergeGuestFavoritesServices(sessionId, userId);
        res.json({ message: 'Favoritos fusionados con éxito' });
    } catch (error) {
        console.error('Error al fusionar favoritos:', error);

        if (error.message === 'NO_GUEST_FAVORITES') {
            return res.status(404).json({ message: 'No hay favoritos para fusionar' });
        }

        if (error.message === 'CUSTOMER_NOT_FOUND') {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.status(500).json({ message: 'Error del servidor' });
    }
};



