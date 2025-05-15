// src/routes/product.route.js
import express from 'express';
import { getAllProducts,getCatalogByFilter,getProductSelected } from '../controllers/product.controller.js';


const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/byFilter', getCatalogByFilter); // Paginados
router.get('/products/selected', getProductSelected); // Paginados


export default router;

// cambiamos el model product pensar bien como funciona la cuestion de las busquedas por que recuerda que en la
// pagina principal donde buscaras primero por armazon solo aparece 1 imaghen por imagen
// posteriormente al seleccionarlo debe traer las imagenes de el color que escogio para mostrar en el frond
// Crear documentacion de todo lo que puede hacer router.get('/products/paginated', getCatalogOfProducts); 
// para no olvidarlo para cuando tenga mas avances
