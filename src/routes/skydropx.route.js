import express from 'express';
import { getToken,getQuotation } from '../controllers/skydropx.controller.js';

const router = express.Router();

router.get('/skydropx/token', getToken);
router.post('/skydropx/quote', getQuotation);

export default router;
