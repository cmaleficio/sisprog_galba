require('dotenv').config()
import express from 'express';
import path from 'path';
import { isDatabaseConnected, getDataFromDatabase, getRealTimeData } from './database';
const { Pool } = require('pg');

// importing routes
import IndexRoutes from './routes';
import cors from 'cors';
import corsOptions from './configs/corsOptions';

// Initialization
const app = express();
app.use(cors(corsOptions));

//Pool for DB connection

const pool = new Pool({
   user: process.env.POSTGRES_USER,
   host: process.env.POSTGRES_HOST,
   database: process.env.POSTGRES_DB,
   password: process.env.POSTGRES_PASSWORD,
   port: process.env.POSTGRES_PORT,
 });

 // Settings
app.set('port', process.env.PORT || 3300);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1', IndexRoutes)
app.get('/results', getDataFromDatabase)
app.get('/Charts', getRealTimeData)

app.listen(app.get('port'), async () => {
   const hasConexionWithDatabase = await isDatabaseConnected()
   console.log(`conectada ${hasConexionWithDatabase}`)
   console.log('app server on port', app.get('port'))
})