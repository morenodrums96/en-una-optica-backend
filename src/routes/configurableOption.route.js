import express from 'express';
import { createConfigurableOption,chageConfigurableOption,searchConfigurableOptionChage,deleteConfigurableOptionChage } from '../controllers/configurableOption.controller.js';

const router = express.Router();

router.post('/configurable-options', createConfigurableOption);
router.post('/configurable-options/change', chageConfigurableOption);
router.get('/configurable-options/search', searchConfigurableOptionChage);
router.delete('/configurable-options/delete/:id', deleteConfigurableOptionChage);


export default router;
