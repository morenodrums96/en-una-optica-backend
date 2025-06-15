import { createConfigurableOptionService, chageConfigurableOptionService, searchConfigurableOptionChageService, deleteConfigurableOptionChageService } from '../services/configurableOption.service.js';

export const createConfigurableOption = async (req, res) => {
  try {
    await createConfigurableOptionService(req.body);
    res.status(201).json({
      message: 'Grupo de opciones creado correctamente'
    });
  } catch (error) {
    console.error('❌ Error al crear grupo de opciones:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const chageConfigurableOption = async (req, res) => {
  try {
    const updated = await chageConfigurableOptionService(req.body);

    if (!updated) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    res.status(201).json({
      message: 'Grupo de opciones actualizado correctamente'
    });
  } catch (error) {
    console.error('❌ Error al actualizar el grupo de opciones:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


export const searchConfigurableOptionChage = async (req, res) => {
  try {
    const result = await searchConfigurableOptionChageService(req.query);

    res.status(200).json(result)
  } catch (error) {
    console.error('❌ Error al buscar grupo:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


export const deleteConfigurableOptionChage = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteConfigurableOptionChageService(id);

    res.status(201).json({
      message: 'Grupo de opciones eliminado correctamente'
    });
  } catch (error) {
    console.error('❌ Error al eliminar el grupo:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
