import express from "express";
import { getAllFinalcialReport } from '../controllers/financialReport.controller.js';


const router = express.Router();

router.get('/financialReport', getAllFinalcialReport);

export default router;
