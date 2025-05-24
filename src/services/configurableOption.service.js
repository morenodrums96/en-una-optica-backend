import { ConfigurableOption } from '../models/configurableOption.model.js';
import mongoose from 'mongoose';

export const createConfigurableOptionService = async (optionData) => {
  await ConfigurableOption.create(optionData);
};

export const chageConfigurableOptionService = async (optionData) => {
  const { _id, ...updateData } = optionData;

  const updated = await ConfigurableOption.findByIdAndUpdate(
    _id,
    { $set: updateData },
    { new: true }
  );

  return updated;
};


export const searchConfigurableOptionChageService = async (filters = {}) => {
  if (filters._id) {
    // Validación básica de ObjectId
    if (!mongoose.Types.ObjectId.isValid(filters._id)) {
      return null; // o podrías lanzar un error si lo prefieres
    }

    // Buscar solo uno
    const result = await ConfigurableOption.findById(filters._id);
    return result ? [result] : []; // devolvemos array para mantener formato uniforme
  }

  // Si no hay _id, busca todos los habilitados
  const results = await ConfigurableOption.find({ enabled: true });
  return results;
};


export const deleteConfigurableOptionChageService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID no válido');
  }

  await ConfigurableOption.findByIdAndDelete(id);
};
