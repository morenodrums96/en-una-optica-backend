import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js'; // Ajusta si tu ruta a app es diferente

describe('POST /api/openpay/confirm', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('debería confirmar el pago y actualizar el estado de la orden', async () => {
    const response = await request(app)
      .post('/api/openpay/confirm')
      .send({
        orderId: '6833bef79c977f170e0f2e5a', // usa aquí una orden real de prueba
        paymentIntentId: 'pi_3RSt3GB9BFYimySb1LORm0ca' // uno que hayas generado
      });

    console.log('✅ Confirmación:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Orden pagada exitosamente');
  });
});
