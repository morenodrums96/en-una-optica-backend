// src/controllers/product.controller.js
import {
  getAllProductsServices,
  getCatalogByFilterServices,
  getProductSelectedServices,
  registrationProductServices,
  updateProdutsServices,
  deleteProductServices,
  getAllProductsByIdsServices,
  getAllProductsByPagesServices,
  calculateCustomerPriceService
} from '../services/product.service.js';


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
    const product = req.body; // ✅ CAMBIO

    const result = await registrationProductServices(product);

    return res.status(201).json({
      message: 'Producto registrado correctamente',
      product: result
    });
  } catch (error) {
    console.error('Error addProduct:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


export const updateProduts = async (req, res) => {
  try {
    const product = req.body; // ✅ CAMBIO

    await updateProdutsServices(product);

    return res.status(201).json({
      message: 'Producto actualizado correctamente'
    });
  } catch (error) {
    console.error('Error updateProduts:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};



export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteProductServices(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    return res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


export const getAllProductsByIds = async (req, res) => {
  try {
    const { ids } = req.body // Asegúrate de recibir un array

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Se requiere un array de IDs' })
    }

    const products = await getAllProductsByIdsServices(ids)
    res.json({ products })
  } catch (error) {
    console.error('Error al obtener productos por ID:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}



export const getAllProductsByPages = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.max(1, parseInt(req.query.limit) || 10)

    const filters = {
      name: req.query.name,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
      unitCost: req.query.unitCost ? parseFloat(req.query.unitCost) : undefined,
      createdAfter: req.query.createdAfter,
      createdBefore: req.query.createdBefore,
    }

    const { products, total } = await getAllProductsByPagesServices(page, limit, filters)
    res.json({ products, total })
  } catch (error) {
    console.error('Error al obtener productos por página:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const getCustomerPriceController = async (req, res) => {
  try {
    const unitCost = parseFloat(req.query.unitCost)

    if (isNaN(unitCost)) {
      return res.status(400).json({ error: 'unitCost inválido' })
    }

    const price = await calculateCustomerPriceService(unitCost)
    return res.status(200).json({ customerPrice: price })
  } catch (error) {
    console.error('Error al calcular precio cliente:', error)
    return res.status(500).json({ message: 'Error del servidor' })
  }
}