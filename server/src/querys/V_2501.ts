require("dotenv").config();
const { Pool, Client } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

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
  //Salida de control de interfaz
  const getRt_V_2501_LIC250130_SP = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554772)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_LIC250130_SP = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554772) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getRt_V_2501_LIC250130_SO = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554771)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_LIC250130_SO = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554771) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  // Salida Control de Crudo
  const getRt_V_2501_LIT250110 = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554770)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
    //Salida de control de interfaz
  const getHt_V_2501_LIT250110 = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554770) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getRt_V_2501_LIC250110_SP = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554778)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_LIC250110_SP = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554778) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getRt_V_2501_LIC250110_SO = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554779)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_LIC250110_SO = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554779) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  //Salida de control de Presión
  const getRt_V_2501_PIT250120 = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554753)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_PIT250120 = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554753) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getRt_V_2501_PIT250120_SP = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554758)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_PIT250120_SP = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554758) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getRt_V_2501_PIT250120_SO = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554759)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_PIT250120_SO = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554759) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  //Flujo de Crudo
  const getRt_V_2501_FIT250110 = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554808)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_FIT250110 = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554808) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getRt_V_2501_FIT250110_Hc = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554806)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_FIT250110_Hc = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554806) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getRt_V_2501_FIT250110_Ha = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554807)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_FIT250110_Ha = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554807) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  //Flujo de Agua
  const getRt_V_2501_FIT250130 = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554804)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_FIT250130 = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554804) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getRt_V_2501_FIT250130_Hc = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554802)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_FIT250130_Hc = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554802) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getRt_V_2501_FIT250130_Ha = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554803)",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  const getHt_V_2501_FIT250130_Ha = (req: any, response: any) => {
    pool.query(
      "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554803) ORDER BY fe_valor DESC LIMIT 7",
      (error: any, results: any) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
    )
  }
  
export { 
  pool,
  getRt_V_2501_LIT250130,
  getHt_V_2501_LIT250130,
  getHt_V_2501_LIC250130_SP,
  getRt_V_2501_LIC250130_SP,
  getHt_V_2501_LIC250130_SO,
  getRt_V_2501_LIC250130_SO,
  getRt_V_2501_LIT250110,
  getHt_V_2501_LIT250110,
  getHt_V_2501_LIC250110_SP,
  getRt_V_2501_LIC250110_SP,
  getHt_V_2501_LIC250110_SO,
  getRt_V_2501_LIC250110_SO,
  getRt_V_2501_PIT250120,
  getHt_V_2501_PIT250120,
  getHt_V_2501_PIT250120_SP,
  getRt_V_2501_PIT250120_SP,
  getHt_V_2501_PIT250120_SO,
  getRt_V_2501_PIT250120_SO,
  getHt_V_2501_FIT250110,
  getRt_V_2501_FIT250110,
  getHt_V_2501_FIT250110_Ha,
  getRt_V_2501_FIT250110_Ha,
  getRt_V_2501_FIT250110_Hc,
  getHt_V_2501_FIT250110_Hc,
  getHt_V_2501_FIT250130,
  getRt_V_2501_FIT250130,
  getHt_V_2501_FIT250130_Ha,
  getRt_V_2501_FIT250130_Ha,
  getRt_V_2501_FIT250130_Hc,
  getHt_V_2501_FIT250130_Hc,
};