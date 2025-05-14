// src/routes/branch.route.js
import express from "express";
import {getAllBranchs} from '../controllers/branch.controller.js';

const router = express.Router();

router.get('/branchs',getAllBranchs);

export default router;

