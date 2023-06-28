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

/* const getRealTimeDataForEmit = () => {
  return pool.query(
    "SELECT * FROM t011_real_tag ORDER BY real_tag_id ASC",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      return results.rows
    }
  );
}; */

// Peticiones por despligues/Dispositivos

// V_2601

const getAnalogV_2601 = (request: any, response: any) => {
  return pool.query(
    "SELECT real_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id, disp_nombre FROM t011_real_tag WHERE real_tag_id in (36554736, 36554737, 36554738, 36554739, 36554740, 36554741, 36554742, 36554743, 36554744, 36554745, 36554746, 36554747, 36554748, 36554749)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
};

const getDigitalV_2601 = (request: any, response: any) => {
  return pool.query(
    "SELECT real_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id, disp_nombre FROM t011_real_tag WHERE real_tag_id in (36554453, 36554454, 36554455, 36554456, 36554457, 36554458, 36554459, 36554460, 36554461, 36554462, 36554463, 36554464, 36554465, 36554466, 36554467, 36554468, 36554469, 36554470, 36554471, 36554472, 36554473, 36554474, 36554475, 36554476)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
};

// V_2501 (IMPORTANT)
const getAnalogV_2501 = (request: any, response: any) => {
  return pool.query(
    "SELECT real_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id, disp_nombre FROM t011_real_tag WHERE real_tag_id in (36554767, 36554771, 36554772, 36554756, 36554758, 36554770,36554778)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
};

/* const getDigitalV_2501 = (request: any, response: any) => {
  return pool.query(
    "SELECT real_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id, disp_nombre FROM t011_real_tag WHERE real_tag_id in ()",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
}; */

// V_2501 Presiones y Temperaturas(Incluye Promedios-Anteriores-y Actual)

const getTIT_250110_P= (request: any, response: any) => {
  return pool.query(
    "SELECT historico_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id FROM t012_historico_tag WHERE historico_tag_id in (36554750)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
};
const getTIT_250110_A= (request: any, response: any) => {
  return pool.query(
    "SELECT historico_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id FROM t012_historico_tag WHERE historico_tag_id in (36554751)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
};
const getTIT_250110= (request: any, response: any) => {
  return pool.query(
    "SELECT historico_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id FROM t012_historico_tag WHERE historico_tag_id in (36554752)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
};
const getPIT_250110_P= (request: any, response: any) => {
  return pool.query(
    "SELECT historico_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id FROM t012_historico_tag WHERE historico_tag_id in (36554754)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
};
const getPIT_250110_A= (request: any, response: any) => {
  return pool.query(
    "SELECT historico_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id FROM t012_historico_tag WHERE historico_tag_id in (36554755)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
};
const getPIT_250110= (request: any, response: any) => {
  return pool.query(
    "SELECT historico_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id FROM t012_historico_tag WHERE historico_tag_id in (3655476)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
};
const getPIT_250120= (request: any, response: any) => {
  return pool.query(
    "SELECT historico_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id FROM t012_historico_tag WHERE historico_tag_id in (36554753)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
};
const getLIT_250130= (request: any, response: any) => {
  return pool.query(
    "SELECT real_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id FROM t011_real_tag WHERE real_tag_id in (36554767)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
};
const getH_LIT_250130= (request: any, response: any) => {
  return pool.query(
    "SELECT historico_tag_id, nu_valor, in_calidad_dato, fe_valor, catalogo_tag_id FROM t012_historico_tag WHERE historico_tag_id in (36554767)",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    }
  );
};



// V_2501 Niveles y Flujo


//TK_20006 (IMPORTANTE)


export { 
  isDatabaseConnected,
  getHistorico, 
  getRealTimeData, 
  pool,
  getAnalogV_2501,
  getTIT_250110_P,
  getTIT_250110_A,
  getTIT_250110,
  getPIT_250110_P,
  getPIT_250110_A,
  getPIT_250110,
  getPIT_250120,
  getLIT_250130,
  getH_LIT_250130,
};
