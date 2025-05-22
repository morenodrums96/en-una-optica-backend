// src/controllers/product.controller.js
import { getAllProductsServices, getCatalogByFilterServices, getProductSelectedServices, registrationProductServices } from '../services/product.service.js';


export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsServices();
    res.json({ products });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
/*tal ves quite el     const limit = Math.max(1,parseInt(req.query.limit) || 12);
esto por que estamos pensando que siempre seran de 12 en 12 y lo unico que se estara cambiando es 
el boton de mas 1,2,3,4,5 de la siguiente pagina
Para el caso del precio ASC, DESC,alfabeticamente y mas vendidos se manejara de esta manera 
?sort=priceAsc
?sort=priceDesc
?sort=alphabetical
?sort=bestSellers
*/
export const getCatalogByFilter = async (req, res) => {
  try {

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 12);
    const brand = req.query.brand || null;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : null;
    const faceShape = req.query.faceShape || null;
    const frameShape = req.query.frameShape || null;
    const frameColor = req.query.frameColor || null;
    const lensColor = req.query.lensColor || null;
    const frameMaterial = req.query.frameMaterial || null;
    const sort = req.query.sort || null;

    const { products, total } = await getCatalogByFilterServices(page, limit, brand, minPrice, maxPrice, faceShape, frameShape, frameColor, lensColor, frameMaterial, sort);

    res.json({
      products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error getCatalogByFilter :', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const getProductSelected = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductSelectedServices(id);
    res.json({ product });
  } catch (error) {
    console.error('Error getProductSelected:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const registrationProduct = async (req, res) => {
  try {
    const product = req.body;
    const result = await registrationProductServices(product);
    return res.status(201).json({
      message: 'Producto registrado correctamente'
    });
  } catch (error) {
    console.error('Error addProduct:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
