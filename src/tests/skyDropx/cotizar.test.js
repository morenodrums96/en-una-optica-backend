import request from 'supertest';
import app from '../../app.js';

describe('POST /api/skydropx/quote', () => {
    it('debería devolver cotizaciones de envío', async () => {
        const quotationBody = {
            address_from: {
                country_code: "mx",
                postal_code: "06500",
                area_level1: "Ciudad de México",
                area_level2: "Cuauhtémoc",
                area_level3: "Río Pánuco"
            },
            address_to: {
                country_code: "mx",
                postal_code: "03100",
                area_level1: "Ciudad de México",
                area_level2: "Benito Juárez",
                area_level3: "Del Valle"
            },
            parcel: {
                length: "20",
                width: "15",
                height: "10",
                weight: "1.0"
            },
            requested_carriers: ["dhl", "fedex", "estafeta", "quiken"]
        }
            ;

        const res = await request(app)
            .post('/api/skydropx/quote')
            .send(quotationBody);

        console.log(JSON.stringify(res.body, null, 2));

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('rates');
        expect(Array.isArray(res.body.rates)).toBe(true);

        const validQuotes = res.body.rates.filter(rate => rate.success === true);
        expect(validQuotes.length).toBeGreaterThanOrEqual(0);
    });
});
