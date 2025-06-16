import express from 'express';
import { createConfigurableOption,chageConfigurableOption,searchConfigurableOptionChage,deleteConfigurableOptionChage ,searchConfigurableOptionChageById,searchConfigurableActiveOptionChage} from '../controllers/configurableOption.controller.js';

const router = express.Router();

router.post('/configurable-options', createConfigurableOption);
router.put('/configurable-options/change', chageConfigurableOption);
router.get('/configurable-options/search', searchConfigurableOptionChage);
router.delete('/configurable-options/delete/:id', deleteConfigurableOptionChage);
router.get('/configurable-options/search/:id', searchConfigurableOptionChageById);
router.get('/configurable-options/searchActive', searchConfigurableActiveOptionChage);


export default router;
