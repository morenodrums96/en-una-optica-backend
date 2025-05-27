import express from "express";
import { createCustomer,createCharge   } from '../controllers/openpay.controller.js';

const router = express.Router();

router.post('/openpay/customers', createCustomer);
router.post('/openpay/confirm', createCharge );




export default router;