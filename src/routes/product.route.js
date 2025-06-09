// src/routes/product.route.js
import express from 'express';
import { getAllProducts, getCatalogByFilter, getProductSelected, registrationProduct } from '../controllers/product.controller.js';


const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/byFilter', getCatalogByFilter); 
router.get('/products/selected/:id', getProductSelected); 
router.post('/products/registration', upload.array('images'), registrationProduct);


export default router;

