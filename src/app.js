// src/app.js
import express from 'express';
import productRoutes from './routes/product.route.js';
import branchRoutes from './routes/branch.route.js';
import customers from './routes/customer.route.js';
import employers from './routes/employer.route.js';
import financialReport from './routes/financialReport.route.js';
import orderRoutes from './routes/order.route.js';
import catalogRoutes from './routes/catalogRoutes.route.js';
import configurableOptionRoutes from './routes/configurableOption.route.js';

const app = express();

// Middlewares
// Para leer JSON en las peticiones( este es un middleware que le dice a Express: 
// “Cuando llegue una petición con contenido JSON (como POST, PUT), por favor conviértelo
// automáticamente en un objeto JavaScript que pueda usar con req.body”)
app.use(express.json());
// Rutas (las conectaremos después)
// app.use('/api', financialReport);

/*Entramos a la pagina y muestra el catalogoa de productos*/
app.use('/api', productRoutes);
app.use('/api', customers);
app.use('/api', employers);
app.use('/api', branchRoutes);
app.use('/api', orderRoutes);
app.use('/api', catalogRoutes);
app.use('/api', configurableOptionRoutes);



export default app;
