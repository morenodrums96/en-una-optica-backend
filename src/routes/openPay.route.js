import express from "express";
import { createCustomer  } from '../controllers/openpay.controller.js';

const router = express.Router();

router.post('/openpay/customers', createCustomer);




export default router;