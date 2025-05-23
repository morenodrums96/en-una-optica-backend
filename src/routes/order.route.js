import express from "express";
import { getAllOrders, generateOrder, orderPagination,completeOrder,removeProductFromOrder  } from "../controllers/order.controller.js";

const router = express.Router();

router.get('/orders', getAllOrders);
router.post('/orders/generateOrder', generateOrder);
router.post('/orders/completeOrder', completeOrder);
router.delete('/orders/:orderId/product/:productIdInterno',removeProductFromOrder )
router.get('/orders/orderPagination', orderPagination);

export default router;