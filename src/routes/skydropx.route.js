import express from 'express';
import { getToken,getQuotation,getQuotationById } from '../controllers/skydropx.controller.js';

const router = express.Router();

router.get('/skydropx/token', getToken);
router.post('/skydropx/quote', getQuotation);
router.get('/v1/quotations/:id', getQuotationById);

export default router;
