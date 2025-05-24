// src/tests/productRegistration.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';

describe('POST /api/products/registration', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('debe registrar un nuevo producto correctamente', async () => {
        const newProduct = {
            name: "Test Producto with other thing",
            category: "Lentes de Sol",
            brand: "Marca Prueba",
            model: "TP-123",
            description: "Producto de prueba para test",
            unitCost: 200,
            supplier: "Proveedor Prueba",
            quantity: 10,
            variants: [
                {
                    color: "Negro",
                    image: "https://example.com/image.jpg",
                    images: ["https://example.com/1.jpg", "https://example.com/2.jpg"]
                },
                {
                    color: "blanco",
                    image: "https://example.com/image.jpg",
                    images: ["https://example.com/1.jpg", "https://example.com/2.jpg"]
                }
            ],
            lensColor: "682e852bf0aaa3a211110d78",
            customerPrice: 350,
            frameMaterial: "682e852bf0aaa3a211110d7b",
            frond: true,
            iva: true,
            faceShape: "682e852bf0aaa3a211110d7e",
            frameShape: "682e852bf0aaa3a211110d81",
            configurableOptions: ["68314d8ee22c426ff43ce5ee", "68314ca19db39f97f8476660"],
            sales: 3

        };

        const response = await request(app)
            .post('/api/products/registration')
            .send(newProduct);

        console.log(response.body);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Producto registrado correctamente');
        expect(response.body).not.toHaveProperty('product');

    });
});
