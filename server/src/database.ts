require("dotenv").config();
const { Pool, Client } = require("pg");
import { io } from './index';

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

client.connect((err: any, res: any) => {
  if (err) {
    console.log("Error Conectando a la DB", err);
  } else {
    client.on("notification", (msg: any) => {
      console.log(msg.payload);
      io.send(msg.payload);
    });
    const query = client.query("LISTEN t11update");
  }
});

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

export { isDatabaseConnected, getHistorico, getRealTimeData }