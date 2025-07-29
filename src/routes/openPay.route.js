import express from "express";
import { createCustomer,createCharge,getOpenPayToken   } from '../controllers/openpay.controller.js';

const router = express.Router();

router.post('/openpay/customers', createCustomer);
router.post('/openpay/confirm', createCharge );
router.post('/openpay/getOpenPayToken', getOpenPayToken)



export default router;