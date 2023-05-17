import { response } from "express";
import { io } from ".";
require("dotenv").config();
const { Pool, Client } = require("pg");
const socket = require('socket.io');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const isDatabaseConnected = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    // await pool.end();
    return true;
  } catch (error) {
    console.error(
      `Hubo un error al intentar conectarme a la base de datos ${error}`
    );
    return false;
  }
};

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

// Get Everything from DB (real_time)
const getData = (req: any, res: any) => {
  client.connect();
  client.query('LISTEN update_notification', (error: any, results: any) =>{
    if (error) {
      throw error;
    }
    client.on('notification', (msg: any) => {
      if(msg.payload){
      const payload = JSON.parse(msg.payload);
      console.log('Notificación recibida:', payload);
    
      // Envía los datos a los clientes conectados a través de Socket.io
      io.emit('update_notification', payload);
    }
    });
  });
}


const getHistorico = (request: any, response: any) => {
  pool.query(
    "SELECT * FROM t012_historico_tag ORDER BY fe_valor DESC",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getRealTimeData = (request: any, response: any) => {
  pool.query(
    "SELECT * FROM t011_real_tag ORDER BY real_tag_id ASC",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};



export { isDatabaseConnected, getHistorico, getRealTimeData, getData }