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
    const error = new Error('Ya existe un registro con ese label en este grupo');
    error.code = 409;
    throw error;
  }

  // Guardar con el label normalizado
  return await Catalog.create({ ...catalogRegis, label: normalizedLabel });
};

export const getGroupsServices = async (groups) => {
   const catalogs = await Catalog.find({
      group: { $in: groups },
      active: true
    }).sort({ group: 1, label: 1 });

    return catalogs
};