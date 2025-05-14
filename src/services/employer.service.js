import { Employer } from '../models/employer.model.js';

export const getAllEmployersService = async () =>{
    const employers = await Employer.find();
    return employers;
}