import express from "express";
import {getAllEmployers} from '../controllers/employer.controller.js';
const router = express.Router();

router.get('/employers',getAllEmployers);

export default router;