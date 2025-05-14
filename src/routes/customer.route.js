import express from 'express';
import { getAllCustomers,getFavorites,postFavorites } from '../controllers/customer.controller.js';

const router = express.Router();

router.get('/customers', getAllCustomers);
//GET /api/customers/6824048335970730255c73a2/favorites
router.get('/customers/:id/favorites', getFavorites); // Paginados
router.post('/customers/:id/postFavorites',postFavorites);
export default router;