import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';

describe('GET /api/products/selected', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('debe devolver un producto seleccionado', async () => {
        const response = await request(app)
            .get('/api/products/selected/68314dd7954319d8ebc97b63');

        console.log(JSON.stringify(response.body, null, 2));
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('product');
        expect(typeof response.body.product).toBe('object');
        expect(response.body.product).toHaveProperty('_id');
        expect(response.body.product).toHaveProperty('name');
    });
});
