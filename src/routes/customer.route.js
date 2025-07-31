import express from 'express';
import { getAllCustomers, getFavorites, postFavorites,registerCustomer } from '../controllers/customer.controller.js';

const router = express.Router();

router.get('/customers', getAllCustomers);
router.get('/customers/:id/favorites', getFavorites); 
router.post('/customers/:id/postFavorites', postFavorites);
router.post('/customers/registerCustomer', registerCustomer);

export default router;