import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept', 'Origin', 'Authorization'],
  credentials: false,
  optionsSuccessStatus: 200,
  preflightContinue: true,
};

export default corsOptions;