import cors from 'cors';

export const configureCors = () => {
  const allowedOriginsDev = [
    'http://localhost:3000'
  ];

  const allowedOriginsProd = [
    'https://enunaoptica.com',
    'https://www.enunaoptica.com' // por si usas con www
  ];

  const isProduction = process.env.NODE_ENV === 'production';
  const allowedOrigins = isProduction ? allowedOriginsProd : allowedOriginsDev;

  return cors({
    origin: function (origin, callback) {
      // Permitir peticiones sin origen (como Postman o servidores internos)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`🌐 CORS bloqueado para: ${origin}`);
        callback(new Error('No permitido por CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
  });
};
