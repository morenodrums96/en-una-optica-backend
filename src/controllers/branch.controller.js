//src/controller/branch.controller.js
import { getBranchService } from '../services/branch.service.js';

export const getAllBranchs = async (req, res) => {
    try {
        const branchs = await getBranchService();
        res.json(branchs);
    } catch (error) {
        console.error('Error al obtener el branch:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};