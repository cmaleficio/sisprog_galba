import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept', 'Origin', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

export default corsOptions;