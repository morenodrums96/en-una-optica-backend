// src/routes/product.route.js
import express from 'express';
import { getAllProducts } from '../controllers/product.controller.js';
import { getCatalogOfProducts } from '../controllers/product.controller.js';


const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/paginated', getCatalogOfProducts); // Paginados


export default router;

// cambiamos el model product pensar bien como funciona la cuestion de las busquedas por que recuerda que en la 
// pagina principal donde buscaras primero por armazon solo aparece 1 imaghen por imagen 
// posteriormente al seleccionarlo debe traer las imagenes de el color que escogio para mostrar en el frond 

