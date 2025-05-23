import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';

describe('GET /api/products', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('debe devolver un producto seleccionado', async () => {
        const response = await request(app)
            .get('/api/products');

        console.log(JSON.stringify(response.body, null, 2));

        console.log('Todas las variants:');
        console.log(response.body.products.map(p => p.variants));

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('products');
        expect(Array.isArray(response.body.products)).toBe(true);
    });
});
