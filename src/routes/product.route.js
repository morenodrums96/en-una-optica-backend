// src/routes/product.route.js
import express from 'express';
import { getAllProducts, getCatalogByFilter, getProductSelected, registrationProduct } from '../controllers/product.controller.js';


const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/byFilter', getCatalogByFilter); // Paginados
router.get('/products/selected', getProductSelected); // Paginados
router.post('/products/registration', registrationProduct); // Paginados


export default router;

