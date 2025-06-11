import express from "express";
import { getAllEmployers, postEmployeeRegistration, employeeUpdate, employeeById, employersPagination,employeeLogin } from '../controllers/employer.controller.js';
const router = express.Router();

router.get('/employers', getAllEmployers);
router.post('/employeeRegistration', postEmployeeRegistration);
router.post('/employeeUpdate', employeeUpdate);
router.get('/employeeById/:id', employeeById);
router.get('/employers/pagination', employersPagination);
router.post('/secure/entrada-de-control-personal', employeeLogin);
router.get('/secure/mi-perfil', (req, res) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ message: 'No autenticado' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).json({ usuario: decoded })
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' })
  }
})

export default router;