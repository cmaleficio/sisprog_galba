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
    // await pool.end();
    return true;
  } catch (error) {
    console.error(
      `Hubo un error al intentar conectarme a la base de datos ${error}`
    );
    return false;
  }
};

const saveDataOnDatabaseReal = async (data_from_scrapper: any) => {
  try {
    await Promise.all(
      // Use map to create an array of promises,

      // with one promise for each item in myArray.

      data_from_scrapper.map(async (data: any) => {
        // Wait for the promise returned by

        //doSomethingAsync to resolve.

        const arr = [
          data[1],
          data[4],
          data[6],
          data[7],
          data[1],
        ];
        console.log("Datos filtrados",arr);
    
        const realData = await pool.query(
          "INSERT INTO t011_real_tag (real_tag_id,nu_valor,in_calidad_dato,fe_valor,catalogo_tag_id) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (real_tag_id) DO UPDATE SET nu_valor = $2, in_calidad_dato = $3, fe_valor = $4",
        arr
        );
      })
    );
  } catch (error) {
    console.log("erroooooor => ", error)
    error;
  }
};

const saveDataOnDatabaseHistorico = async (data_from_scrapper: any) => {
  try {
    await Promise.all(
      // Use map to create an array of promises,

      // with one promise for each item in myArray.

      data_from_scrapper.map(async (data: any) => {
        // Wait for the promise returned by

        //doSomethingAsync to resolve.

        const arr = [
          data[1],
          data[4],
          data[6],
          data[7],
          data[1],
        ];
        console.log("Datos filtrados",arr);

        const res = await pool.query(
          "INSERT INTO t012_historico_tag (historico_tag_id,nu_valor,in_calidad_dato,fe_valor,catalogo_tag_id) VALUES ($1,$2,$3,$4,$5)",
          arr
        );
        
        const realData = await pool.query(
          "INSERT INTO t011_real_tag (real_tag_id,nu_valor,in_calidad_dato,fe_valor,catalogo_tag_id) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (real_tag_id) DO UPDATE SET nu_valor = $2, in_calidad_dato = $3, fe_valor = $4",
        arr
        );
      })
    );
  } catch (error) {
    console.log("erroooooor => ", error)
    error;
  }
};


export { isDatabaseConnected, saveDataOnDatabaseHistorico, saveDataOnDatabaseReal };
