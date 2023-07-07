require('dotenv').config();
import express from 'express';
import http, { get } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { isDatabaseConnected, 
  getHistorico, 
  getRealTimeData, 
  } from './database';
import { getRt_V2501_EntradaLiquido,  getRt_V_2501_LIT250130,  getHt_V_2501_LIT250130,  getRt_V_2501_LIC250130_SP,  getHt_V_2501_LIC250130_SP,  getRt_V_2501_LIC250130_SO,  getHt_V_2501_LIC250130_SO,  getRt_V_2501_LIT250110,  getHt_V_2501_LIT250110,  getRt_V_2501_LIC250110_SP,  getHt_V_2501_LIC250110_SP,  getRt_V_2501_LIC250110_SO,  getHt_V_2501_LIC250110_SO,  getRt_V_2501_PIT250120,  getHt_V_2501_PIT250120,  getRt_V_2501_PIT250120_SP,  getHt_V_2501_PIT250120_SP,  getRt_V_2501_PIT250120_SO,  getHt_V_2501_PIT250120_SO,  getRt_V_2501_FIT250110,  getHt_V_2501_FIT250110,  getRt_V_2501_FIT250110_Ha,  getHt_V_2501_FIT250110_Ha,  getRt_V_2501_FIT250110_Hc,  getHt_V_2501_FIT250110_Hc,  getRt_V_2501_FIT250130,  getHt_V_2501_FIT250130,  getRt_V_2501_FIT250130_Ha,  getHt_V_2501_FIT250130_Ha,  getRt_V_2501_FIT250130_Hc,  getHt_V_2501_FIT250130_Hc,  
  getHt_V2501_EntradaLiquido, } from './querys/V_2501';
import { getHt_Tk20006_lit_20006, getHt_Tk20006_lit_20006A, getHt_Tk20006_tit_20001, getHt_Tk20006_tit_20002, getHt_Tk20006_tit_20003, getHt_Tk20006_tit_20006, getRt_Tk20006_lit_20006, getRt_Tk20006_lit_20006A, getRt_Tk20006_tit_20001, getRt_Tk20006_tit_20002, getRt_Tk20006_tit_20003, getRt_Tk20006_tit_20006 } from './querys/TK_20006';
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

    // EQUIPOS
  //V2501
//Entrada de liquido
  app.get('/lit250130_rt', getRt_V_2501_LIT250130)
  app.get('/lit250130_ht', getHt_V_2501_LIT250130)    
  app.get('/lic250130_sp_rt',getRt_V_2501_LIC250130_SP)
  app.get('/lic250130_sp_ht',getHt_V_2501_LIC250130_SP)
  app.get('/lic250130_so_rt',getRt_V_2501_LIC250130_SO)
  app.get('/lic250130_so_ht',getHt_V_2501_LIC250130_SO)
//Salida control de Crudo
  app.get('/lit250110_rt',getRt_V_2501_LIT250110)
  app.get('/lit250110_ht',getHt_V_2501_LIT250110)
  app.get('/lic250110_sp_rt',getRt_V_2501_LIC250110_SP)
  app.get('/lic250110_sp_ht',getHt_V_2501_LIC250110_SP)
  app.get('/lic250110_so_rt', getRt_V_2501_LIC250110_SO)
  app.get('/lic250110_so_ht', getHt_V_2501_LIC250110_SO)
//Salida control de Presion
  app.get('/pit250120_rt', getRt_V_2501_PIT250120)
  app.get('/pit250120_ht', getHt_V_2501_PIT250120)
  app.get('/pit250120_sp_rt', getRt_V_2501_PIT250120_SP)
  app.get('/pit250120_sp_ht', getHt_V_2501_PIT250120_SP)
  app.get('/pit250120_so_rt',getRt_V_2501_PIT250120_SO)
  app.get('/pit250120_so_ht',getHt_V_2501_PIT250120_SO)
//Flujo Crudo
  app.get('/fit250110_rt', getRt_V_2501_FIT250110)
  app.get('/fit250110_ht', getHt_V_2501_FIT250110)
  app.get('/fit250110_p_rt', getRt_V_2501_FIT250110_Ha)
  app.get('/fit250110_p_ht', getHt_V_2501_FIT250110_Ha)
  app.get('/fit250110_a_rt', getRt_V_2501_FIT250110_Hc)
  app.get('/fit250110_a_ht', getHt_V_2501_FIT250110_Hc)
//Flujo Agua
  app.get('/fit250130_rt', getRt_V_2501_FIT250130 )
  app.get('/fit250130_ht', getHt_V_2501_FIT250130)
  app.get('/fit250130_p_rt', getRt_V_2501_FIT250130_Ha)
  app.get('/fit250130_p_ht', getHt_V_2501_FIT250130_Ha)
  app.get('/fit250130_a_rt', getRt_V_2501_FIT250130_Hc)
  app.get('/fit250130_a_ht', getHt_V_2501_FIT250130_Hc)
  
  //TK20006
  app.get('/lit20006_rt', getRt_Tk20006_lit_20006)
  app.get('/lit20006_ht', getHt_Tk20006_lit_20006)
  app.get('/lit20006A_rt', getRt_Tk20006_lit_20006A)
  app.get('/lit20006A_ht', getHt_Tk20006_lit_20006A)
  app.get('/tit20006_rt', getRt_Tk20006_tit_20006)
  app.get('/tit20006_ht', getHt_Tk20006_tit_20006)
  app.get('/tit20001_rt', getRt_Tk20006_tit_20001)
  app.get('/tit20001_ht', getHt_Tk20006_tit_20001)
  app.get('/tit20002_rt', getRt_Tk20006_tit_20002)
  app.get('/tit20002_ht', getHt_Tk20006_tit_20002)
  app.get('/tit20003_rt', getRt_Tk20006_tit_20003)
  app.get('/tit20003_ht', getHt_Tk20006_tit_20003)

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
