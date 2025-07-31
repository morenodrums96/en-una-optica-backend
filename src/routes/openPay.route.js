import express from "express";
import { createCustomer,createCharge } from '../controllers/openpay.controller.js';

const router = express.Router();

router.post('/payments/create-customer', createCustomer);
router.post('/payments/create-charge', createCharge)



export default router;

