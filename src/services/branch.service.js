import { Branch } from '../models/branch.model.js';

export const getBranchService = async () => {
    const branchs = await Branch.find();
    return branchs;
};

export const branchRegistrationServices = async (branch) => {
    await Branch.create(branch);
};

export const branchUpdateServices = async (branchInfor) => {
    const { _id, ...updateFields } = branchInfor;
    return await Branch.updateOne({ _id }, updateFields);
};

export const branchByIdService = async () => {
    return await Branch.findById(id);
};

export const branchPaginationServices = async () => {
 const skip = (page - 1) * limit;
  const query = {};
  if (filters.name) {
    query.name = { $regex: filters.name, $options: 'i' }; // insensible a mayúsculas
  }
  if (filters.state) {
    query.state = { $regex: filters.state, $options: 'i' };
  }
  if (filters.city) {
    query.city = { $regex: filters.city, $options: 'i' };
  }
  if (filters.stree) {
    query.stree = filters.stree;
  }
  const branches = await Branch.find(query, {
    name: 1,
    state: 1,
    city: 1,
    stree: 1,
  }).skip(skip).limit(limit);
  const total = await Branch.countDocuments(query);
  return { branches, total };
};