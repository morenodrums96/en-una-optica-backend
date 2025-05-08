// src/app.js
import express from 'express';
import productRoutes from './routes/product.routes.js';


const app = express();

// Middlewares
// Para leer JSON en las peticiones( este es un middleware que le dice a Express: 
// “Cuando llegue una petición con contenido JSON (como POST, PUT), por favor conviértelo
// automáticamente en un objeto JavaScript que pueda usar con req.body”)
app.use(express.json()); 
// Rutas (las conectaremos después)
app.use('/api', productRoutes);

export default app;
