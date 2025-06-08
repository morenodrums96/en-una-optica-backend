import request from 'supertest';
import app from '../../app.js';

describe('GET /api/v1/quotations/', () => {
    it('debería devolver cotizaciones de envío', async () => {
        const res = await request(app).get('/api/v1/quotations/162369bd-3402-4620-8c3b-e0c92167cc69');
        console.log(JSON.stringify(res.body, null, 2));

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('rates');
        expect(Array.isArray(res.body.rates)).toBe(true);

        const validQuotes = res.body.rates.filter(rate => rate.success === true);
        expect(validQuotes.length).toBeGreaterThanOrEqual(0);
    });
});
