import { Branch } from '../models/branch.model.js';

export const getBranchService = async ()=>{
    const branchs = await Branch.find();
    return branchs;
}