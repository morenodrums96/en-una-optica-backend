import { getAllEmployersService, postEmployeeRegistrationService, employeeUpdateServices, employeeByIdServices, employersPaginationServices } from "../services/employer.service.js";

export const getAllEmployers = async (req, res) => {
  try {
    const employers = await getAllEmployersService();
    res.json(employers);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const postEmployeeRegistration = async (req, res) => {
  try {
    const employerInfor = req.body;
    await postEmployeeRegistrationService(employerInfor);
    res.status(200).json({ message: 'Alta realizada con exito.' });
  } catch (error) {
    console.log('error al dar de alta un empleado', error);
    res.status(500).json({ message: 'error del servidor' });
  }
};

export const employeeUpdate = async (req, res) => {
  try {
    const employerInfor = req.body;
    const result = await employeeUpdateServices(employerInfor);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado o no se encontraron cambios' });
    }
    res.status(200).json({ message: 'Empleado actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar un empleado:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const employeeById = async (req, res) => {
  try {
    const id = req.query.id || null;
    if (!id) {
      res.status(400).json({ message: 'Falta el ID del cliente' });
    }
    const employee = employeeByIdServices(id);
    if (!employee) {
      res.status(400).json({ message: 'Cliente no encontrado' });
    }
    res.json({ employee });
  } catch (error) {
    console.error('Error al buscar empleado:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const employersPagination = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 12);
    const filters = {
      name: req.query.name || '',
      secondLastName: req.query.secondLastName || '',
      secondName: req.query.secondName || '',
      branch: req.query.branch || '',
    };
    const { employeers, total } = await employersPaginationServices(page, limit, filters);
    res.json({
      employeers,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error al buscar empleados:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
