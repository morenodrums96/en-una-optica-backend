import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';

describe('GET /api/orders/orderPagination', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    // it('debe devolver un producto seleccionado', async () => {
    //     const response = await request(app)
    //         .get('/api/orders/orderPagination?status=pending');

    //     console.log(JSON.stringify(response.body, null, 2));

    //     console.log('Todas las variants:');

    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toHaveProperty('order');
    //     expect(Array.isArray(response.body.order)).toBe(true);
    // });

    it('debe devolver un producto seleccionado', async () => {
        const response = await request(app)
            .get('/api/orders/getbyClient')
            .query({ customerId: '682d6e872b2dc1c506b84140' }); // O puedes usar { customerId: '...' }

        console.log(JSON.stringify(response.body, null, 2));

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('order');
        expect(Array.isArray(response.body.order)).toBe(true);
    });
});
