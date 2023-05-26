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
app.get('/', (req: any, res: any) =>{
  res.json("Hola bebes")
})

const server = app.listen(app.get('port'), async () => {
  const hasConexionWithDatabase = await isDatabaseConnected();
  console.log(`Conectado a la base de datos: ${hasConexionWithDatabase}`);
  console.log('App server on port', app.get('port'));
});

const io = new Server(server, {
  cors: corsOptions
});

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
        let data = JSON.parse(msg.payload)
        io.emit('data', {
          data
        });
        console.log(data);
      });
      const query = client.query("LISTEN t11update");
    })
  } catch (error) {
    console.log("Error Conectando a la DB", error);
  }
  
  // Escuchar eventos personalizados desde el cliente
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });

  socket.on('error', (err) => {
    console.log(`Error: ${err}`);
  });
});

export { io };
