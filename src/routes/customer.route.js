import express from 'express';
import { getAllCustomers, getFavorites, postFavorites, postGuestFavorite, getGuestFavorite, postMergeGuestFavorites } from '../controllers/customer.controller.js';

const router = express.Router();

router.get('/customers', getAllCustomers);
//GET /api/customers/6824048335970730255c73a2/favorites
router.get('/customers/:id/favorites', getFavorites); // Paginados
router.post('/customers/:id/postFavorites', postFavorites);
router.post('/customers/postGuestFavorite', postGuestFavorite);
router.get('/customers/getGuestFavorite/:sessionId', getGuestFavorite);
router.get('/customers/postMergeGuestFavorites', postMergeGuestFavorites);

export default router;