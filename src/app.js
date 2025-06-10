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
import openPay from './routes/openPay.route.js';
import skydropxRoutes from './routes/skydropx.route.js';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use('/api', productRoutes);
app.use('/api', customers);
app.use('/api', employers);
app.use('/api', branchRoutes);
app.use('/api', orderRoutes);
app.use('/api', catalogRoutes);
app.use('/api', configurableOptionRoutes);
app.use('/api', openPay);
app.use('/api', skydropxRoutes);


export default app;
