// src/tests/productRegistration.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';

describe('POST /api/catalog/registration', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('debe registrar un color opcion en el catalogo correctamente', async () => {
        const newProduct = {
            group: "lensColor",
            label: "verde",
            active:true
        };

        const response = await request(app)
            .post('/api/catalog/registration')
            .send(newProduct);

        console.log(response.body);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'nuevo registro en el catalogo registrado correctamente');
        expect(response.body).not.toHaveProperty('catalog');

    });

    it('debe registrar un material correctamente', async () => {
        const newProduct = {
            group: "frameMaterial",
            label: "Titanio",//Plástico,Metal,Madera,Titanio
            active:true
        };

        const response = await request(app)
            .post('/api/catalog/registration')
            .send(newProduct);

        console.log(response.body);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'nuevo registro en el catalogo registrado correctamente');
        expect(response.body).not.toHaveProperty('catalog');

    });

     it('debe registrar un material correctamente', async () => {
        const newProduct = {
            group: "faceShape",
            label: "diamante",//Cuadrada,Redonda,De corazón ,De diamante
            active:true
        };

        const response = await request(app)
            .post('/api/catalog/registration')
            .send(newProduct);

        console.log(response.body);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'nuevo registro en el catalogo registrado correctamente');
        expect(response.body).not.toHaveProperty('catalog');

    });

     it('debe registrar un material correctamente', async () => {
        const newProduct = {
            group: "frameShape",
            label: "ovaladas",//redondas,rectangulares,ovaladas
            active:true
        };

        const response = await request(app)
            .post('/api/catalog/registration')
            .send(newProduct);

        console.log(response.body);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'nuevo registro en el catalogo registrado correctamente');
        expect(response.body).not.toHaveProperty('catalog');

    });
});
