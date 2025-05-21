import express from "express";
import { getAllOrders, generateOrder, orderPagination } from "../controllers/order.controller.js";

const router = express.Router();

router.get('/orders', getAllOrders);
router.post('/orders/generateOrder', generateOrder);
router.get('/orders/orderPagination', orderPagination);

export default router;