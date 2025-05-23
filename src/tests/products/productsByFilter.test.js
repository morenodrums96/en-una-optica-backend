import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js'; // asegúrate que la ruta esté bien


describe('GET /api/products/byFilter', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://adminjavier:admin1234@localhost:27017/enunaopticadev?authSource=admin');
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('debe devolver una lista paginada de productos', async () => {
        const response = await request(app)
            .get('/api/products/byFilter?page=1&limit=5');
        console.log(response.body);
        console.log('Todas las variants:');
        console.log(response.body.products.map(p => p.variants));

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('products');
        expect(Array.isArray(response.body.products)).toBe(true);
        expect(response.body.products.length).toBeLessThanOrEqual(10);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('currentPage', 1);
        expect(response.body).toHaveProperty('totalPages');
    });

    it('devuelve una lista de paginacion de productos de manera ascendente.', async () => {
        const response = await request(app).get('/api/products/byFilter?page=1&limit=5&sort=priceAsc');
        console.log(response.body);
        console.log('Todas las variants:');
        console.log(response.body.products.map(p => p.variants));

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('products');
        expect(Array.isArray(response.body.products)).toBe(true);
        expect(response.body.products.length).toBeLessThanOrEqual(10);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('currentPage', 1);
        expect(response.body).toHaveProperty('totalPages');
    });

    it('devuelve una lista de paginacion de productos por precio descendente.', async () => {
        const response = await request(app).get('/api/products/byFilter?page=1&limit=5&sort=priceDesc');
        console.log(response.body);
        console.log('Todas las variants:');
        console.log(response.body.products.map(p => p.variants));

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('products');
        expect(Array.isArray(response.body.products)).toBe(true);
        expect(response.body.products.length).toBeLessThanOrEqual(10);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('currentPage', 1);
        expect(response.body).toHaveProperty('totalPages');
    });

    it('devuelve una lista de paginacion de productos por precio descendente.', async () => {
        const response = await request(app).get('/api/products/byFilter?page=1&limit=5&sort=alphabetical');
        console.log(response.body);
        console.log('Todas las variants:');
        console.log(response.body.products.map(p => p.variants));

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('products');
        expect(Array.isArray(response.body.products)).toBe(true);
        expect(response.body.products.length).toBeLessThanOrEqual(10);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('currentPage', 1);
        expect(response.body).toHaveProperty('totalPages');
    });

    it('devuelve una lista de paginacion de productos por precio descendente.', async () => {
        const response = await request(app).get('/api/products/byFilter?page=1&limit=5&sort=bestSellers');
        console.log(response.body);
        console.log('Todas las variants:');
        console.log(response.body.products.map(p => p.variants));

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('products');
        expect(Array.isArray(response.body.products)).toBe(true);
        expect(response.body.products.length).toBeLessThanOrEqual(10);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('currentPage', 1);
        expect(response.body).toHaveProperty('totalPages');
    });


});