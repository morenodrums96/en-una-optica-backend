import { Customer } from '../models/customer.model.js';
import { Product } from '../models/product.model.js';
import { AnonymousFavorite } from '../models/anonymousFavoriteSchema.model.js';

import mongoose from 'mongoose';

export const getAllCustomersService = async () => {
    const customers = await Customer.find();
    return customers;

};


export const getFavoritesService = async (id) => {

    const customer = await Customer.findById(id).populate('favorites', 'name brand image customerPrice');

    return customer;
}

export const postFavoritesService = async (customerId, productId) => {
    const customer = await Customer.findById(customerId);
    if (!customer) throw new Error('Cliente no encontrado');

    const productExists = await Product.exists({ _id: productId });
    if (!productExists) throw new Error('Producto no encontrado');
    console.log('productExists: ' + productExists);

    const productObjectId = new mongoose.Types.ObjectId(productId);
    console.log('productObjectId: ' + productObjectId);

    const index = customer.favorites.findIndex(fav => fav.equals(productObjectId));

    if (index === -1) {
        customer.favorites.push(productObjectId);
    } else {
        customer.favorites.splice(index, 1);
    }

    await customer.save();

    return await customer.populate('favorites', 'name brand image customerPrice');
};


export const postGuestFavoriteServices = async (sessionId, productId) => {

    const entry = await AnonymousFavorite.findOne({ sessionId });

    if (entry) {
        const alreadyExists = entry.favorites.some(fav => fav.equals(productId));
        if (!alreadyExists) entry.favorites.push(productId);
        entry.updatedAt = new Date();
        await entry.save();
    } else {
        await AnonymousFavorite.create({
            sessionId,
            favorites: [productId]
        });
    }
}

export const getGuestFavoriteServices = async (sessionId) => {

    return AnonymousFavorite.findOne({ sessionId }).populate('favorites');

}

export const getMergeGuestFavoritesServices = async (sessionId, userId) => {
    const guest = await AnonymousFavorite.findOne({ sessionId });

    if (!guest || !guest.favorites.length) {
        throw new Error('NO_GUEST_FAVORITES'); // lanza error específico
    }

    const customer = await Customer.findById(userId);
    if (!customer) throw new Error('CUSTOMER_NOT_FOUND');

    guest.favorites.forEach(productId => {
        if (!customer.favorites.some(fav => fav.equals(productId))) {
            customer.favorites.push(productId);
        }
    });

    await customer.save();
    await AnonymousFavorite.deleteOne({ sessionId });

    return customer; // opcional si quieres usarlo en el controller
};

export const registerCustomerServices = async (customerInfor) => {
    Customer.create(customerInfor);
}
