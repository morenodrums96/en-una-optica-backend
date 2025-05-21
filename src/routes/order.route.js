import express from "express";
import { getAllOrders,generateOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.get('/orders', getAllOrders);
router.post('/orders/generateOrder', generateOrder);

export default router;