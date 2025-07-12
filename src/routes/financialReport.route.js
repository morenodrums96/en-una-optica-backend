import express from "express";
import { getAllFinalcialReport,saveSettingsFinance,getSettingsFinance } from '../controllers/financialReport.controller.js';


const router = express.Router();

router.get('/financialReport', getAllFinalcialReport);
router.put('/settings/finance', saveSettingsFinance);
router.get('/settings/finance', getSettingsFinance);

export default router;
