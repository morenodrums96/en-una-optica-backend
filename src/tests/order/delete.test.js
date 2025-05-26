import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';

describe('POST /api/orders/generateOrder', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });


    it('elimina producto de una orden', async () => {
        const orderId = '682fe69187c81e6bede121fa';
        const productIdInterno = '682feb212b3ba4d63055cf38';

        const response = await request(app)
            .delete(`/api/orders/${orderId}/product/${productIdInterno}`);
        console.log(JSON.stringify(response.body, null, 2));

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('order');
        expect(response.body.order.products.find(p => p._id === productIdInterno)).toBeUndefined();
    });


});
