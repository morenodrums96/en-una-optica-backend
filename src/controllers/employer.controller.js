import { getAllEmployersService } from "../services/employer.service.js";

export const getAllEmployers = async (req, res) => {
try {
    const employers = await getAllEmployersService();
    res.json(employers);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};