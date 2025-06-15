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
  const projection = '_id group groupDescription allowMultiple enabled'

  if (filters._id) {
    if (!mongoose.Types.ObjectId.isValid(filters._id)) {
      return [];
    }

    const result = await ConfigurableOption.findById(filters._id).select(projection);
    return result ? [result] : [];
  }

  const results = await ConfigurableOption.find({ enabled: true }).select(projection);
  return results;
};



export const deleteConfigurableOptionChageService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID no válido');
  }

  await ConfigurableOption.findByIdAndDelete(id);
};
