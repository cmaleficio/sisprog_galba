require("dotenv").config();
const { Pool, Client } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});


export const managerView = (req:any, response:any) => {
  pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554911, 36554916, 36554899, 36554899, 36554900, 36554901, 36554902) ORDER BY real_tag_id DESC",
      (error:any , results:any) => {
          if (error) {
           throw(error);
          }
      response.status(200).json(results.rows);
      }
  )
}
export const mvSepV2501_1 = (req:any, response:any) => {
  pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554767, 36554771, 36554772, 36554770, 36554777, 36554778) ORDER BY real_tag_id ASC",
      (error:any , results:any) => {
          if (error) {
           throw(error);
          }
      response.status(200).json(results.rows);
      }
  )
}

export const mvSepV2501graph = (req:any, response:any) => {
  pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554767, 36554770) ORDER BY real_tag_id ASC",
      (error:any , results:any) => {
          if (error) {
           throw(error);
          }
      response.status(200).json(results.rows);
      }
  )
}

export const mvTk501 = (req:any, response:any) => {
  pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554874, 36554875, 36554869)",
      (error:any , results:any) => {
          if (error) {
           throw(error);
          }
      response.status(200).json(results.rows);
      }
  )
}
export const mvEx002 = (req:any, response:any) => {
  pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554946, 36554952, 36554956,36554957 ) ORDER BY real_tag_id ASC",
      (error:any , results:any) => {
          if (error) {
           throw(error);
          }
      response.status(200).json(results.rows);
      }
  )
}
export const mvTqyBomba = (req:any, response:any) => {
  pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554867, 36554952) ORDER BY real_tag_id DESC",
      (error:any , results:any) => {
          if (error) {
           throw(error);
          }
      response.status(200).json(results.rows);
      }
  )
}