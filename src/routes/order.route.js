import express from "express";
import { getAllOrders,getOrderById  } from "../controllers/order.controller.js";

const router = express.Router();

router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);


export default router;