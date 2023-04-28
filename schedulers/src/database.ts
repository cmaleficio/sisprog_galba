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

const save_data_on_database = async (data_from_scrapper: any) => {
  try {
    await Promise.all(
      // Use map to create an array of promises,

      // with one promise for each item in myArray.

      data_from_scrapper.map(async (data: any) => {
        // Wait for the promise returned by

        //doSomethingAsync to resolve.

         /*const res = await pool.query(
          "INSERT INTO puntos_analogicos(nombre,id_equipo,device_id,tipo_de_dato,valor_recolectado,ultimo_valor_escrito,calidad,marca_de_tiempo,banda_muerta,periodo,periodo_real,tiempo_de_transferencia,tipo_de_procesamiento,lim_inf_entrada,lim_sup_entrada,lim_inf_salida,lim_sup_salida,linealizacion_entrada,entrada_m,entrada_b,linealizacion_salida,salida_m,salida_b,timeout,inhibido,direccion_entrada,direccion_salida,bloque) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28)",
          data
        ); */

        const arr = [
          data[1],
          data[4],
          data[6],
          data[7],
          data[1]
        ];
        console.log("Datos filtrados",arr);

        const res = await pool.query(
          "INSERT INTO t012_historico_tag (historico_tag_id,nu_valor,in_calidad_dato,fe_valor,catalogo_tag_id) VALUES ($1,$2,$3,$4,$5)",
          arr
        );
        
        const realData = await pool.query(
        //"INSERT INTO t011_real_tag (real_tag_id,nu_valor,in_calidad_dato,fe_valor,catalogo_tag_id) VALUES ($1,$2,$3,$4,$5) "
        //"UPDATE t011_ral_tag, t012_historico_tag SET t011_ral_tag_nu_valor=t012_historico_tag_nu_valor WHERE real_tag_id=historico_tag_id"
        //"IF EXISTS (SELECT 1 FROM tabla WHERE real_tag_id = ${arr[1]) UPDATE t011_real_tag SET (nu_valor = ${arr[4]},in_calidad_dato = ${arr[6]},fe_valor= ${arr[7]} WHERE real_tag_id = ${arr[1]} ELSE INSERT INTO t011_real_tag (real_tag_id,nu_valor,in_calidad_dato,fe_valor,catalogo_tag_id) VALUES ($1,$2,$3,$4,$5)",
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

export { isDatabaseConnected, save_data_on_database };
