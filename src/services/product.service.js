import { Product } from '../models/product.model.js';

export const getAllProductsServices = async () => {
    const products = Product.find();
    return products;
};

export const getCatalogByFilterServices = async (
    page = 1,
    limit = 12,
    brand = null,
    minPrice = null,
    maxPrice = null,
    faceShape = null,
    frameShape = null,
    frameColor = null,
    lensColor = null,
    frameMaterial = null,
    sort = null
) => {
    const skip = (page - 1) * limit;
    const query = {};

    if (brand) query.brand = brand;

    if (minPrice !== null || maxPrice !== null) {
        query.customerPrice = {};
        if (minPrice !== null) query.customerPrice.$gte = minPrice;
        if (maxPrice !== null) query.customerPrice.$lte = maxPrice;
    }

    if (faceShape) query.faceShape = faceShape;
    if (frameShape) query.frameShape = frameShape;
    if (frameColor) query.frameColor = frameColor;
    if (lensColor) query.lensColor = lensColor;
    if (frameMaterial) query.frameMaterial = frameMaterial;

    // Ordenamiento dinámico
    const sortOptions = {};

    switch (sort) {
        case 'priceAsc':
            sortOptions.customerPrice = 1;
            break;
        case 'priceDesc':
            sortOptions.customerPrice = -1;
            break;
        case 'alphabetical':
            sortOptions.name = 1;
            break;
        case 'bestSellers':
            sortOptions.sales = -1; // Necesitas un campo "sales" en el modelo
            break;
        default:
            break;
    }
    query.quantity = { $gt: 0 };

    const products = await Product.find(query, {
        name: 1,
        brand: 1,
        customerPrice: 1,
        'variants._id': 1,
        'variants.color': 1,
        'variants.image': 1,
        _id: 1
    }).sort(sortOptions).skip(skip).limit(limit);

    const total = await Product.countDocuments(query);

    return { products, total };
};


export const getProductSelectedServices = async (id = null) => {

    const products = Product.findById(id, {
        _id: 1,
        name: 1,
        brand: 1,
        customerPrice: 1,
        variants: 1
    });
    return products;
};

export const registrationProductServices = async (product) => {
    Product.create(product);
}
