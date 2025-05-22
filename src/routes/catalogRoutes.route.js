import express from "express";
import { catalogRegister,getGroups } from '../controllers/catalog.controller.js';
const router = express.Router();


router.post('/catalog/registration', catalogRegister);
router.get('/catalogs', getGroups); 

export default router;