import request from 'supertest';
import app from '../../app.js';

describe('GET /api/v1/quotations/', () => {
    it('debería devolver cotizaciones de envío', async () => {
        const res = await request(app).get(
            '/api/v1/quotations/9fb6baf7-03c0-4e33-b7d5-0e69f9fcf9ed?orderId=6833bef79c977f170e0f2e5a'// recuerda que para este caso el orderId puede ser por session o por el que ya tenemps en la BD 
        );
        console.log(JSON.stringify(res.body, null, 2));

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('rates');
        expect(Array.isArray(res.body.rates)).toBe(true);

        const validQuotes = res.body.rates.filter(rate => rate.success === true);
        expect(validQuotes.length).toBeGreaterThanOrEqual(0);
    });
});
