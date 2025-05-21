// src/routes/branch.route.js
import express from "express";
import {getAllBranchs,branchRegistration,branchUpdate,branchById,employersPagination} from '../controllers/branch.controller.js';

const router = express.Router();

router.get('/branchs',getAllBranchs);
router.post('/branchRegistration', branchRegistration);
router.post('/branchUpdate', branchUpdate);
router.get('/branchById/:id', branchById);
router.get('/branch/pagination', employersPagination);

export default router;

