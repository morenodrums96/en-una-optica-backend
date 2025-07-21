import express from "express";
import { getExpenses, postExpenses, deleteExpenses, updateExpense, getStockItems } from '../controllers/expenses.controller.js';


const router = express.Router();

router.get('/expenses', getExpenses);
router.post('/expenses', postExpenses);
router.delete('/expenses/:id', deleteExpenses);
router.put('/expenses/:id', updateExpense)
router.get('/stock', getStockItems)

export default router;
