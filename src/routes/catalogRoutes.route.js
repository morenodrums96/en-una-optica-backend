import express from "express";
import { catalogRegister,getGroups,updateCatalogEntry,updateCatalogActiveStatus ,getAllGroups} from '../controllers/catalog.controller.js';
const router = express.Router();


router.post('/catalog/registration', catalogRegister);
router.get('/catalogs', getGroups); 
router.patch('/catalogs/:id', updateCatalogEntry);
router.patch('/catalogs/:id/status', updateCatalogActiveStatus);
router.get('/allCatalogs', getAllGroups); 

export default router;