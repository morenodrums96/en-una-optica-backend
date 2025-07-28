// src/app.js
import express from 'express';
import cookieParser from 'cookie-parser';

import productRoutes from './routes/product.route.js';
import branchRoutes from './routes/branch.route.js';
import customers from './routes/customer.route.js';
import employers from './routes/employer.route.js';
import orderRoutes from './routes/order.route.js';
import catalogRoutes from './routes/catalogRoutes.route.js';
import configurableOptionRoutes from './routes/configurableOption.route.js';
import openPay from './routes/openPay.route.js';
import skydropxRoutes from './routes/skydropx.route.js';
import s3Routes from './routes/s3.route.js'
import { configureCors } from './utils/configureCors.js';
import expenses from './routes/expenses.route.js';
import financialReport from './routes/financialReport.route.js';
import wishlist from './routes/wishlist.route.js';
import cart from './routes/cart.route.js';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(configureCors()); // 👈 Usa la configuración dinámica

// ✅ Rutas
app.use('/api', productRoutes);
app.use('/api', customers);
app.use('/api', employers);
app.use('/api', branchRoutes);
app.use('/api', orderRoutes);
app.use('/api', catalogRoutes);
app.use('/api', configurableOptionRoutes);
app.use('/api', openPay);
app.use('/api', skydropxRoutes);
app.use('/api', s3Routes);
app.use('/api', expenses)
app.use('/api', financialReport)
app.use('/api', wishlist)
app.use('/api', cart)

export default app;
