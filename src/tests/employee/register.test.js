// src/tests/productRegistration.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';

describe('POST /api/employeeRegistration', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });


    it('debe registrar un tipo de lente correctamente', async () => {
        const newEmployee = {
            name: "Javier",
            secondName: "Moreno",
            secondLastName: "Rojas",
            cellphone: "8331076925",
            birthDate: "1996-09-29",
            personalEmail: "morenotag@hotmail.com",
            companyEmail: "javier.admin@enunaoptica.com",
            password: "EnUnaOptica96",
            status: true,
            rol: "admin",
            branch: "CDMX",
            direction: {
                street: "Río Pánuco #183",
                externalNumber: "123",
                internalNumber: "4B",
                postalCode: "06500",
                neighborhood: "Cuauhtémoc",
                city: "Ciudad de México",
                state: "CDMX",
                telefono: "5560670561"
            }
        };


        const response = await request(app)
            .post('/api/employeeRegistration')
            .send(newEmployee);

        console.log(JSON.stringify(response.body, null, 2));

        expect(response.statusCode).toBe(200);

    });
});
