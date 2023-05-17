require('dotenv').config();
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { isDatabaseConnected, getHistorico, getRealTimeData } from './database';
const { Pool } = require('pg');

// importing routes
import IndexRoutes from './routes';
import cors from 'cors';
import corsOptions from './configs/corsOptions';

// Initialization
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions
});

app.use(cors(corsOptions));

//Pool for DB connection
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// Get Everything from DB (real_time)
const getData = (req: any, res: any) => {
  pool.connect();
  pool.query('LISTEN update_notification', (error: any, results: any) =>{
    if (error) {
      throw error;
    }
    pool.on('notification', (msg: any) => {
      if(msg.payload){
      const payload = JSON.parse(msg.payload);
      console.log('Notificación recibida:', payload);
    
      // Envía los datos a los clientes conectados a través de Socket.io
      io.emit('update_notification', payload);
    }
    });
  });
}

// Settings
app.set('port', process.env.PORT || 3300);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1', IndexRoutes);
app.get('/results', getHistorico);
app.get('/rtd', getRealTimeData);
app.get('/gtd', getData);

// Socket.io events
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Aquí puedes agregar eventos personalizados para el socket
  // Por ejemplo: socket.on('miEvento', (data) => { ... });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

server.listen(app.get('port'), async () => {
  const hasConexionWithDatabase = await isDatabaseConnected();
  console.log(`conectada ${hasConexionWithDatabase}`);
  console.log('app server on port', app.get('port'));
});