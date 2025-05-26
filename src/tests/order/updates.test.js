import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';

describe('POST /api/orders/cuantity', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('agregar nformacion faltante ', async () => {
        const newOrder = {
            //sessionId: 'asd123',
            customerId: '682d6e872b2dc1c506b84140',
            cellphone: '8331076925',
            correo: 'morenotag@hotmail.com',
            shippingInfo: {
                name: 'Javier',
                secondName: 'Moreno',
                secondLastName: 'Rojas',
                street: 'Ejidatarios',
                externalNumber: '702',
                postalCode: '89290',
                neighborhood: 'Residencial las puentes',
                city: 'San Nicolas De Los Garza',
                state: 'Nuevo Leon',
                aditionalReferents: 'casa blanca con techo rojo'
            }

        };

        const response = await request(app)
            .post('/api/orders/completeOrder')
            .send(newOrder);

        console.log(response.body);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Orden completada correctamente');
        expect(response.body).toHaveProperty('order');
        expect(response.body.order).toHaveProperty('_id');
        expect(response.body.order).toHaveProperty('totalAmount');
        expect(typeof response.body.order.totalAmount).toBe('number');
    });

    // it('agregar nformacion faltante ', async () => {
    //     const newOrder = {
    //         customerId: '682d6e872b2dc1c506b84140',
    //         products: [
    //             {
    //                 products_id: '6833c248cec3cf4e9ca9b85d',
    //                 quantity: 6
    //             },{
    //                 products_id: '6833c4042731825b2e70fc6b',
    //                 quantity: 1
    //             }
    //         ]
    //     };
    //     const response = await request(app)
    //         .post('/api/orders/cuantity')
    //         .send(newOrder);

    //     console.log(response.body);

    //     expect(response.statusCode).toBe(201);
    //     expect(response.body).toHaveProperty('message', 'Orden actualizada correctamente');
    //     expect(response.body).not.toHaveProperty('order');
    // });
});
