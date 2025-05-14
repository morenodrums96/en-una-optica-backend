import { Customer } from '../models/customer.model.js';
import { Product } from '../models/product.model.js';
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