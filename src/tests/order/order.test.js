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
    //                 productId: '682d6cd761e0488b17ca55ef',
    //                 quantity: 1
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
    //     expect(response.body.order).toHaveProperty('products');
    //     expect(response.body.order).toHaveProperty('totalAmount');
    // });

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



    // it('carrito de compra por customerID', async () => {
    //     const newOrder = {
    //         customerId: '682d6e872b2dc1c506b84140',
    //         products: [{
    //             productId: '682d6cd761e0488b17ca55f0'
    //             , quantity: 1
    //         }, {
    //             productId: '682d6cd761e0488b17ca55f0'
    //             , quantity: 1
    //         }]

    //     };

    //     const response = await request(app)
    //         .post('/api/orders/generateOrder')
    //         .send(newOrder);

    //     console.log(response.body);

    //     expect(response.statusCode).toBe(201);
    //     expect(response.body).toHaveProperty('message', 'orden registrado correctamente');
    //     expect(response.body).not.toHaveProperty('order');
    // });

    // it('agregar nformacion faltante ', async () => {
    //     const newOrder = {
    //         //sessionId: 'asd123',
    //         customerId: '682d6e872b2dc1c506b84140',
    //         cellphone: '8331076925',
    //         correo: 'morenotag@hotmail.com',
    //         shippingInfo: {
    //             name: 'Javier',
    //             secondName: 'Moreno',
    //             secondLastName: 'Rojas',
    //             street: 'Ejidatarios',
    //             externalNumber: '702',
    //             postalCode: '89290',
    //             neighborhood: 'Residencial las puentes',
    //             city: 'San Nicolas De Los Garza',
    //             state: 'Nuevo Leon',
    //             aditionalReferents: 'casa blanca con techo rojo'
    //         }

    //     };

    //     const response = await request(app)
    //         .post('/api/orders/completeOrder')
    //         .send(newOrder);

    //     console.log(response.body);

    //     expect(response.statusCode).toBe(201);
    //     expect(response.body).toHaveProperty('message', 'Orden completada correctamente');
    //     expect(response.body).not.toHaveProperty('order');
    // });
});
