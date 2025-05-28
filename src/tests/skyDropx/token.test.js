import request from 'supertest';
import app from '../../app.js';

describe('GET /api/skydropx/token', () => {
  it('debería devolver el token de envío', async () => {
    const res = await request(app).get('/api/skydropx/token');

    console.log(JSON.stringify(res.body, null, 2));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });
});
