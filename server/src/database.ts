require("dotenv").config();
const { Pool, Client } = require("pg");


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
    return true;
  } catch (error) {
    console.error(`Hubo un error al intentar conectarme a la base de datos ${error}`);
    return false;
  }
};

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

const getRealTimeDataForEmit = () => {
  return pool.query(
    "SELECT * FROM t011_real_tag ORDER BY real_tag_id ASC",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      return results.rows
    }
  );
};

const getData2501 = () => {
  return pool.query(
    "SELECT real_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id FROM t011_real_tag WHERE real_tag_id in (36554433, 36554434, 36554435, 36554436, 36554437, 36554438)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      console.log(results.rows)
      return results.rows
    }
  );
};

export { isDatabaseConnected, getHistorico, getRealTimeData, pool, getRealTimeDataForEmit, getData2501 };
