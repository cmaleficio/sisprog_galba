require('dotenv').config();
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { isDatabaseConnected, 
  getHistorico, 
  getRealTimeData, 
  getAnalogV_2501,
  getTIT_250110_P,
  getTIT_250110_A,
  getTIT_250110,} from './database';
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

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

// Settings
app.set('port', process.env.PORT || 3300);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1', IndexRoutes);
app.get('/results', getHistorico);
app.get('/rtd', getRealTimeData);

// DATA V_2501
app.get('/V_2501a', getAnalogV_2501)
/* app.get('/V_2501d', getDigitalV_2501) */


  //2501 Instrumentos
  app.get('/TIT_V2501_P', getTIT_250110_P)
  app.get('/TIT_V2501_A', getTIT_250110_A)
  app.get('/TIT_V2501', getTIT_250110)
  

// Socket.io events
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Emitir un mensaje al cliente conectado

  pool.connect((err: any, res: any) => {
    if (err) {
      console.log("Error Conectando a la DB", err);
    } else {
      client.on("notification", async (msg: any) => {
        pool.query(
          "SELECT * FROM t011_real_tag ORDER BY real_tag_id ASC",
          (error: any, results: any) => {
            if (error) {
              throw error;
            }
            socket.emit('data', {
              data: results.rows
            });
          }
        );
      });
      const query = client.query("LISTEN t11update");
    }
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
