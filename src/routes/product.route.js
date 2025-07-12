// src/routes/product.route.js
import express from 'express';
import { getAllProducts, getCatalogByFilter, 
getProductSelected, 
registrationProduct,
updateProduts,
deleteProduct,
getAllProductsByIds,
getAllProductsByPages,
getCustomerPriceController } from '../controllers/product.controller.js';


const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/byFilter', getCatalogByFilter); 
router.get('/products/byPages', getAllProductsByPages); 
router.get('/products/selected/:id', getProductSelected); 
router.post('/products/registration', registrationProduct);
router.patch('/products/update', updateProduts);
router.delete('/products/:id', deleteProduct);
router.post('/products/byIds', getAllProductsByIds)
router.get('/products/customerPrice', getCustomerPriceController)


export default router;

