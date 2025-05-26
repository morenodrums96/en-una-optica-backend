import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';

describe('POST /api/openpay/customers', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('debería crear un cliente en OpenPay y devolver su ID', async () => {
    const response = await request(app)
      .post('/api/openpay/customers')
      .send({
        customerId: '682d6e872b2dc1c506b84140'
      });

    console.log('🔐 Response:', response.body);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Cliente creado en OpenPay');

  });

});

// Falta que esta madre regresa un openpayCustomerId que es un ID donde se guardara su informacion financiera si el cliente ya 
// tiene un customerID es por que ya existe en la BD y ahi podemos guardar el openpayCustomerId. Si no existe se genera por session y se regresa al
// frond tanto si es por customerID o por session . lo podemos guardar el openpayCustomerId tanto si es por session como por
// customer pero si limpia cache se borra la informacion y ahi queda en la BD.Una ves esto procedemos a ejecutar el siguiente api el cual es para realizar cobro 
// guardar estatus y de mas en la BD de pendieng a pagado y cobrar el total. despues ver lo de Aplazo y 
// despues ver lo de DHL o Stafeta 