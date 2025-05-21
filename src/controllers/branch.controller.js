//src/controller/branch.controller.js
import { getBranchService, branchRegistrationServices, branchUpdateServices ,branchByIdService,branchPaginationServices} from '../services/branch.service.js';

export const getAllBranchs = async (req, res) => {
    try {
        const branchs = await getBranchService();
        res.json(branchs);
    } catch (error) {
        console.error('Error al obtener el branch:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const branchRegistration = async (req, res) => {
    try {
        const branch = req.body;
        await branchRegistrationServices(branch);
        res.status(200).json({ message: 'Sucursal dada de alta de manera correcta.' })
    } catch (error) {
        console.error('Error al dar de alta el branch:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const branchUpdate = async (req, res) => {
    try {
        const branchInfor = req.body;
        const result = await branchUpdateServices(branchInfor);
        if (result.modifiedCount === 0) {
            res.status(400).json({ message: 'Empleado no encontrado o no se encontraron cambios' });
        }
    } catch (error) {
        console.error('Error al actualizar el branch:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }

};

export const branchById = async (req, res) => {
    try {
        const id = req.query.id || null;
        if (!id) {
            res.status(400).json({ message: 'Falta el ID de la sucursal' });
        }
        const result = branchByIdService(id);
        if (!result) {
            res.status(400).json({ message: 'Sucursal no encontrada' });
        }
    } catch (error) {
        console.error('Error al buscar el branch:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};


export const employersPagination = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 12);
        const filters = {
            name: req.query.name || '',
            state: req.query.state || '',
            city: req.query.city || '',
            stree: req.query.stree || '',
        };
        const { branches, total } = await branchPaginationServices(page, limit, filters);
        res.json({
            branches,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error('Error al buscar el branch:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};