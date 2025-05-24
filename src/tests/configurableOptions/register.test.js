// src/tests/productRegistration.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';

describe('POST /api/configurable-options', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });


    it('debe registrar un tipo de lente correctamente', async () => {
        const newConfiguration = {
            group: "prescripción prueba de otra configuracion",
            groupDescription: "Para distancia o lectura.",
            required: true,
            allowMultiple: true,
            showSizeSelector: true,
            options: [
                {
                    name: "Transicional",
                    description: "Las lentes cambian de transparentes a gafas de sol con la exposición a los rayos UV.",
                    price: 1500,
                    enabled: true,
                    availableColors: [{
                        name: "rojo",
                        hex: " #FF0000",
                        enabled: true,
                    },
                    {
                        name: "azul",
                        hex: " #0000FF",
                        enabled: true
                    }]
                },
                {
                    name: "Filtro de luz azul",
                    description: "Elimina la fatiga visual al ver computadoras y dispositivos digitales.",
                    price: 1400,
                    enabled: true
                },
                {
                    name: "Alto índice",
                    description: "Nuestro lente más delgado recomendado para graduaciones fuera de +/-4.00 para garantizar un ajuste cómodo.",
                    price: 5000,
                    enabled: true
                }
            ]
        };

        const response = await request(app)
            .post('/api/configurable-options')
            .send(newConfiguration);

        console.log(response.body);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Grupo de opciones creado correctamente');
        expect(response.body).not.toHaveProperty('ConfigurableOption');

    });
});
