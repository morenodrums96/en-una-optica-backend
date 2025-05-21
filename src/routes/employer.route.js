import express from "express";
import { getAllEmployers, postEmployeeRegistration, employeeUpdate, employeeById, employersPagination } from '../controllers/employer.controller.js';
const router = express.Router();

router.get('/employers', getAllEmployers);
router.post('/employeeRegistration', postEmployeeRegistration);
router.post('/employeeUpdate', employeeUpdate);
router.get('/employeeById/:id', employeeById);
router.get('/employers/pagination', employersPagination);

export default router;