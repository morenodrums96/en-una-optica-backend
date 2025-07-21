import { Product } from '../models/product.model.js';
import { extractKeysFromVariants, cleanupS3Images } from '../utils/cleanProductImages.js'
import { deleteFilesFromS3 } from '../controllers/s3.controller.js'
import { FinancialReport } from "../models/financialReports.model.js";
import ExpenseModel from '../models/expense.js'
import StockItemModel from '../models/StockItemSchema.js'

export const getAllProductsServices = async () => {
    const products = await Product.find({}, {
        name: 1,
        category: 1,
        'variants.image': 1,
        'variants.color': 1,
        customerPrice: 1,
        unitCost: 1
    })
        .sort({ createdAt: -1 })
        .populate([
            { path: 'frameMaterial' },
            { path: 'faceShape' },
            { path: 'frameShape' },
            { path: 'variants.color' }
        ])
        .lean();

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
    query['variants.quantity'] = { $gt: 0 };

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
    const product = await Product.findById(id)
        .populate('frameMaterial faceShape frameShape configurableOptions variants.color');
    return product;
};


export const registrationProductServices = async (product) => {
    return await Product.create(product); // ✅ Retornar el producto creado
}


export const updateProdutsServices = async (productData) => {
    const { _id, variants: newVariants, ...rest } = productData

    const existingProduct = await Product.findById(_id)
    if (!existingProduct) throw new Error('Producto no encontrado')

    await cleanupS3Images(existingProduct.variants, newVariants)

    return await Product.findByIdAndUpdate(
        _id,
        { $set: { variants: newVariants, ...rest } },
        { new: true, runValidators: true }
    ).populate('frameMaterial faceShape frameShape configurableOptions variants.color')
}


export const deleteProductServices = async (id) => {
    const product = await Product.findById(id)
    if (!product) return null

    const keys = extractKeysFromVariants(product.variants)
    await deleteFilesFromS3(keys)

    return await Product.findByIdAndDelete(id)
}




export const getAllProductsByIdsServices = async (ids) => {
    return await Product.find({ _id: { $in: ids } })
}



export const getAllProductsByPagesServices = async (page, limit, filters = {}) => {
    const skip = (page - 1) * limit;

    const query = {}

    if (filters.name) {
        query.name = { $regex: filters.name, $options: 'i' } // búsqueda insensible
    }

    if (filters.minPrice != null || filters.maxPrice != null) {
        query.customerPrice = {}
        if (filters.minPrice != null) {
            query.customerPrice.$gte = filters.minPrice
        }
        if (filters.maxPrice != null) {
            query.customerPrice.$lte = filters.maxPrice
        }
    }

    if (filters.unitCost !== undefined) {
        query.unitCost = filters.unitCost
    }

    if (filters.createdAfter || filters.createdBefore) {
        query.createdAt = {}
        if (filters.createdAfter) {
            query.createdAt.$gte = new Date(filters.createdAfter)
        }
        if (filters.createdBefore) {
            query.createdAt.$lte = new Date(filters.createdBefore)
        }
    }

    const [products, total] = await Promise.all([
        Product.find(query, {
            name: 1,
            brand: 1,
            model: 1,
            unitCost: 1,
            category: 1,
            customerPrice: 1,
            'variants._id': 1,
            'variants.color': 1,
            'variants.image': 1,
            createdAt: 1
        })
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit),
        Product.countDocuments(query)
    ])

    return { products, total }
}


export async function calculateCustomerPriceService(unitCost) {
    const financialData = await FinancialReport.findOne()
    if (!financialData || !financialData.desiredMargin) {
        throw new Error('Faltan datos financieros')
    }

    const marginPercent = financialData.desiredMargin

    // 🗓️ Rango del mes actual
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    // 💰 Gastos del mes actual
    const expenses = await ExpenseModel.find({
        date: { $gte: firstDay, $lte: lastDay },
    })

    const gastosFijos = expenses.filter(e => e.type === 'Gasto Fijo')
    const gastosVariables = expenses.filter(e => e.type === 'Gasto Variable')

    const totalFijos = gastosFijos.reduce((sum, e) => sum + (e.amount || 0), 0)
    const totalVariables = gastosVariables.reduce((sum, e) => sum + (e.amount || 0), 0)

    // 📦 Stock disponible actual
    const stockItems = await StockItemModel.find()
    const totalUnidades = stockItems.reduce((sum, item) => sum + (item.availableQuantity || 0), 0)

    if (totalUnidades === 0) {
        throw new Error('No hay unidades en stock para calcular el precio')
    }

    // 💡 Reparto proporcional de gastos por unidad
    const gastoFijoPorUnidad = totalFijos / totalUnidades
    const gastoVariablePorUnidad = totalVariables / totalUnidades

    // 🧾 Costo total y precio final
    const costoTotalPorUnidad = unitCost + gastoFijoPorUnidad + gastoVariablePorUnidad
    const precioSinIVA = parseFloat(costoTotalPorUnidad * (1 + marginPercent / 100).toFixed(2))
    const precioConIVA = parseFloat((precioSinIVA * 1.16).toFixed(2)) // 16% de IVA

    return {
        priceWithoutVAT: precioSinIVA,
        customerPrice: precioConIVA,
    }
}
