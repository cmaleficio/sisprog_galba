require("dotenv").config();
const { Pool, Client } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const getRt_Tk20006_lit_20006 = (req:any, response:any) => {
    pool.query(
        "SELECT * FROM t011_real_tag where real_tag_id in (36554916)",
        (error:any , results:any) => {
            if (error) {
             throw(error);
            }
        response.status(200).json(results.rows);
        }
    )
}
const getHt_Tk20006_lit_20006 = (req:any, response:any) => {
    pool.query(
        "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554916) ORDER BY fe_valor DESC LIMIT 7",
        (error:any , results:any) => {
            if (error) {
             throw(error);
            }
        response.status(200).json(results.rows);
        }
    )
}
const getRt_Tk20006_lit_20006A = (req:any, response:any) => {
    pool.query(
        "SELECT * FROM t011_real_tag where real_tag_id in (36554911)",
        (error:any , results:any) => {
            if (error) {
             throw(error);
            }
        response.status(200).json(results.rows);
        }
    )
}
const getHt_Tk20006_lit_20006A = (req:any, response:any) => {
    pool.query(
        "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554911) ORDER BY fe_valor DESC LIMIT 7",
        (error:any , results:any) => {
            if (error) {
             throw(error);
            }
        response.status(200).json(results.rows);
        }
    )
}
const getRt_Tk20006_tit_20006 = (req:any, response:any) => {
    pool.query(
        "SELECT * FROM t011_real_tag where real_tag_id in (36554899)",
        (error:any , results:any) => {
            if (error) {
             throw(error);
            }
        response.status(200).json(results.rows);
        }
    )
}
const getHt_Tk20006_tit_20006 = (req:any, response:any) => {
    pool.query(
        "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554899) ORDER BY fe_valor DESC LIMIT 7",
        (error:any , results:any) => {
            if (error) {
             throw(error);
            }
        response.status(200).json(results.rows);
        }
    )
}
const getRt_Tk20006_tit_20001 = (req:any, response:any) => {
    pool.query(
        "SELECT * FROM t011_real_tag where real_tag_id in (36554902)",
        (error:any , results:any) => {
            if (error) {
             throw(error);
            }
        response.status(200).json(results.rows);
        }
    )
}
const getHt_Tk20006_tit_20001 = (req:any, response:any) => {
    pool.query(
        "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554902) ORDER BY fe_valor DESC LIMIT 7",
        (error:any , results:any) => {
            if (error) {
             throw(error);
            }
        response.status(200).json(results.rows);
        }
    )
}
const getRt_Tk20006_tit_20002 = (req:any, response:any) => {
    pool.query(
        "SELECT * FROM t011_real_tag where real_tag_id in (36554901)",
        (error:any , results:any) => {
            if (error) {
             throw(error);
            }
        response.status(200).json(results.rows);
        }
    )
}
const getHt_Tk20006_tit_20002 = (req:any, response:any) => {
    pool.query(
        "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554901) ORDER BY fe_valor DESC LIMIT 7",
        (error:any , results:any) => {
            if (error) {
             throw(error);
            }
        response.status(200).json(results.rows);
        }
    )
}
const getRt_Tk20006_tit_20003 = (req:any, response:any) => {
    pool.query(
        "SELECT * FROM t011_real_tag where real_tag_id in (36554900)",
        (error:any , results:any) => {
            if (error) {
             throw(error);
            }
        response.status(200).json(results.rows);
        }
    )
}
const getHt_Tk20006_tit_20003 = (req:any, response:any) => {
    pool.query(
        "SELECT * FROM t012_historico_tag WHERE historico_tag_id in (36554900) ORDER BY fe_valor DESC LIMIT 7",
        (error:any , results:any) => {
            if (error) {
             throw(error);
            }
        response.status(200).json(results.rows);
        }
    )
}

export { 
  pool,
  getHt_Tk20006_lit_20006,
  getRt_Tk20006_lit_20006,
  getRt_Tk20006_lit_20006A,
  getHt_Tk20006_lit_20006A,
  getRt_Tk20006_tit_20006,
  getHt_Tk20006_tit_20006,
  getRt_Tk20006_tit_20001,
  getHt_Tk20006_tit_20001,
  getRt_Tk20006_tit_20002,
  getHt_Tk20006_tit_20002,
  getRt_Tk20006_tit_20003,
  getHt_Tk20006_tit_20003,

};