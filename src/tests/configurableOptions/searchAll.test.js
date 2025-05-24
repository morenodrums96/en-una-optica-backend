import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';

describe('GET /api/configurable-options/search', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('debe obtener todos los grupos configurables (sin _id)', async () => {
    const response = await request(app)
      .get('/api/configurable-options/search');

    console.log('[GET TODOS]', JSON.stringify(response.body, null, 2));

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('result');
    expect(Array.isArray(response.body.result)).toBe(true);
  });

  it('debe obtener solo el grupo solicitado por _id', async () => {
    const response = await request(app)
      .get('/api/configurable-options/search?_id=68313cd8484d057bbf0d9bac');

    console.log('[GET POR ID]', JSON.stringify(response.body, null, 2));

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('result');
    expect(Array.isArray(response.body.result)).toBe(true);
    expect(response.body.result.length).toBeLessThanOrEqual(1); // uno o ninguno
  });
});
