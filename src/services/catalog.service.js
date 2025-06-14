// services/catalog.service.js
import { Catalog } from '../models/catalog.model.js';

export const catalogRegisterServices = async (catalogRegis) => {
  const { group, label } = catalogRegis;

  const normalizedLabel = label.trim().toLowerCase().replace(/^\w/, c => c.toUpperCase());

  const exists = await Catalog.findOne({
    group,
    label: normalizedLabel
  });

  if (exists) {
    const error = new Error('Ya existe un registro en este grupo');
    error.code = 409;
    throw error;
  }

  // Guardar con el label normalizado
  return await Catalog.create({ ...catalogRegis, label: normalizedLabel });
};

export const getGroupsServices = async (groups) => {
  const catalogs = await Catalog.find({
    group: { $in: groups },
  }).sort({ group: 1, label: 1 });

  return catalogs
};

export const updateCatalogEntryServices = async (id, label) => {
  // Primero verificar si existe
  const existingCatalog = await Catalog.findById(id);

  if (!existingCatalog) {
    const error = new Error('El producto a modificar no existe');
    error.code = 404;
    throw error;
  }

  // Luego actualiza
  const updated = await Catalog.findByIdAndUpdate(
    id,
    { label },
    { new: true }
  );

  return updated;
};

export const updateCatalogActiveStatusService = async (id, newStatus) => {
  const existingCatalog = await Catalog.findById(id);

  if (!existingCatalog) {
    const error = new Error('El registro no existe');
    error.code = 404;
    throw error;
  }

  await Catalog.findByIdAndUpdate(id, { active: newStatus });
};
