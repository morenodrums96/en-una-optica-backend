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

    // it('carrito de compra por session', async () => {
    //     const newOrder = {
    //         sessionId: 'asd123asd1234',
    //         products: [
    //             {
    //                 productId: '68314dd7954319d8ebc97b63',
    //                 configurableOptions: [
    //                     {
    //                         groupId: "68314d8ee22c426ff43ce5ee",
    //                         optionIds: [
    //                             '68314d8ee22c426ff43ce5ef',
    //                             '68314d8ee22c426ff43ce5f2',
    //                             '68314d8ee22c426ff43ce5f3'
    //                         ],
    //                         selectedColors: [
    //                             {
    //                                 optionId: "68314d8ee22c426ff43ce5ef",
    //                                 colorId: "68314d8ee22c426ff43ce5f0"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ]
    //     };

    //     const response = await request(app)
    //         .post('/api/orders/generateOrder')
    //         .send(newOrder);
    //     console.log(JSON.stringify(response.body, null, 2));

    //     expect(response.statusCode).toBe(201);
    //     expect(response.body).toHaveProperty('message', 'orden registrada correctamente');
    //     expect(response.body).toHaveProperty('order'); // ✅ ahora esperas que exista
    //     expect(response.body.order).toHaveProperty('totalAmount');
    // });

    it('carrito de compra por customerID', async () => {
        const newOrder = {
            customerId: '682d6e872b2dc1c506b84140',
            products: [
                {
                    productId: '68314dd7954319d8ebc97b63',
                    configurableOptions: [
                        {
                            groupId: "68314d8ee22c426ff43ce5ee",
                            optionIds: [
                                '68314d8ee22c426ff43ce5ef',
                                '68314d8ee22c426ff43ce5f2',
                                '68314d8ee22c426ff43ce5f3'
                            ],
                            selectedColors: [
                                {
                                    optionId: "68314d8ee22c426ff43ce5ef",
                                    colorId: "68314d8ee22c426ff43ce5f0"
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        const response = await request(app)
            .post('/api/orders/generateOrder')
            .send(newOrder);
        console.log(JSON.stringify(response.body, null, 2));

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'orden registrada correctamente');
        expect(response.body).toHaveProperty('order'); // ✅ ahora esperas que exista
        expect(response.body.order).toHaveProperty('totalAmount');
    });

});
