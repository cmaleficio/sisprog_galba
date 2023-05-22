require('dotenv').config();
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { isDatabaseConnected, getHistorico, getRealTimeData } from './database';
const { Pool, Client } = require('pg');

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

// Settings
app.set('port', process.env.PORT || 3300);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1', IndexRoutes);
app.get('/results', getHistorico);
app.get('/rtd', getRealTimeData);

// Socket.io events
io.on('connection', (socket) => {
  console.log('(index.ts)Usuario conectado:', socket.id);

  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  })

  // Emitir un mensaje al cliente conectado

  try {
    client.connect((err: any, res: any)=>{
      client.on("notification", (msg: any) => {
        console.log("test ", msg.payload);
        socket.emit('data', {
          data: msg.payload
        });
      });
      const query = client.query("LISTEN t11update");
    })
  } catch (error) {
    console.log("Error Conectando a la DB", error);
  }

/*   client.connect((err: any, res: any) => {
    if (err) {
      console.log("Error Conectando a la DB", err);
    } else {
      client.on("notification", (msg: any) => {
        console.log("test ", msg.payload);
        socket.emit('data', {
          data: msg.payload
        });
      });
      const query = client.query("LISTEN t11update");
    }
  }); */

  // Escuchar eventos personalizados desde el cliente
  socket.on('notification', (data) => {
    console.log('Evento personalizado recibido:', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });

  socket.on('error', (err) => {
    console.log(`Error: ${err}`);
  });
});

server.listen(app.get('port'), async () => {
  const hasConexionWithDatabase = await isDatabaseConnected();
  console.log(`Conectado a la base de datos: ${hasConexionWithDatabase}`);
  console.log('App server on port', app.get('port'));
});

export { io };
