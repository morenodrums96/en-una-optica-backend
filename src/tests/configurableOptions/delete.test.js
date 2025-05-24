import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';

describe('GET /api/configurable-options/delete', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('elimina producto (grupo de opciones)', async () => {
        const idConfiguration = '68313cd8484d057bbf0d9bac';

        const response = await request(app)
            .delete(`/api/configurable-options/delete/${idConfiguration}`);

        console.log(JSON.stringify(response.body, null, 2));

        expect([200, 201, 404]).toContain(response.statusCode);
        if (response.statusCode === 201) {
            expect(response.body).toHaveProperty('message', 'Grupo de opciones eliminado correctamente');
        } else if (response.statusCode === 404) {
            expect(response.body).toHaveProperty('message', 'Grupo no encontrado');
        }
    });

});
