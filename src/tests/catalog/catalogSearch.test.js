import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';

describe('GET /api/catalog', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('debe devolver un producto seleccionado', async () => {
        const response = await request(app)
            .get('/api/catalogs?group=lensColor&group=frameMaterial');

        console.log(JSON.stringify(response.body, null, 2));
        console.log('Todas las variants:');

        expect(response.statusCode).toBe(200);
    });
});
