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

// Peticiones por despligues/Dispositivos
  // V_2501
  // Entrada de liquido
  const getRt_V_2501_LIT250130 = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554767)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_LIT250130 = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554767) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }

  
export { 
  isDatabaseConnected,
  getHistorico, 
  getRealTimeData, 
  pool,
  getRt_V_2501_LIT250130,
  getHt_V_2501_LIT250130,

};
