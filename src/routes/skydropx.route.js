import express from 'express';
import { getToken,getQuotationById } from '../controllers/skydropx.controller.js';

const router = express.Router();

router.get('/skydropx/token', getToken);
router.get('/v1/quotations/:id', getQuotationById);

export default router;
