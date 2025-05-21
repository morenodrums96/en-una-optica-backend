import { Employer } from '../models/employer.model.js';

export const getAllEmployersService = async () => {
    const employers = await Employer.find();
    return employers;
}

//dejamos al final la bitacora para saber quien registra y actualiza
export const postEmployeeRegistrationService = async (employerInfor) => {
    await Employer.create(employerInfor);
}
//dejamos al final la bitacora para saber quien registra y actualiza
export const employeeUpdateServices = async (employerInfor) => {
    const { _id, ...updateFields } = employerInfor;
    return await Employer.updateOne({ _id }, updateFields);
};

export const employeeByIdServices = async (id) => {
    return await Employer.findById(id);
}

export const employersPaginationServices = async (page = 1, limit = 12, filters = {}) => {
  const skip = (page - 1) * limit;
  const query = {};
  if (filters.name) {
    query.name = { $regex: filters.name, $options: 'i' }; // insensible a mayúsculas
  }
  if (filters.secondName) {
    query.secondName = { $regex: filters.secondName, $options: 'i' };
  }
  if (filters.secondLastName) {
    query.secondLastName = { $regex: filters.secondLastName, $options: 'i' };
  }
  if (filters.branch) {
    query.branch = filters.branch;
  }
  const employeers = await Employer.find(query, {
    name: 1,
    secondName: 1,
    secondLastName: 1,
    cellphone: 1,
    companyEmail: 1,
    branch: 1
  }).skip(skip).limit(limit);
  const total = await Employer.countDocuments(query);
  return { employeers, total };
};