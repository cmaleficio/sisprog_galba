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
export const mvSalidaCrudoV2501= (req:any, response:any) => {
  pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554808, 36554801, 36554800, 36554799, 36554798, 36554797) ORDER BY real_tag_id DESC",
      (error:any , results:any) => {
          if (error) {
           throw(error);
          }
      response.status(200).json(results.rows);
      }
  )
}
export const mvSalidaAguaV2501= (req:any, response:any) => {
  pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554804, 36554789, 36554788, 36554787, 36554786, 36554785) ORDER BY real_tag_id DESC",
      (error:any , results:any) => {
          if (error) {
           throw(error);
          }
      response.status(200).json(results.rows);
      }
  )
}
export const mvSalidaGasV2501= (req:any, response:any) => {
  pool.query(
      "SELECT * FROM t011_real_tag WHERE real_tag_id in (36554805, 36554794, 36554793, 36554792, 36554791, 36554790) ORDER BY real_tag_id DESC",
      (error:any , results:any) => {
          if (error) {
           throw(error);
          }
      response.status(200).json(results.rows);
      }
  )
}

//export {mvSalidaCrudoV2501}
/* 
const data = [
  {
    "real_tag_id": 36554946,
    "nu_valor": "2.52359",
    "in_calidad_dato": "192 - Buena",
    "fe_valor": "2023-08-02T16:15:21.156Z",
    "catalogo_tag_id": 36554874,
    "disp_nombre": "TK2K6.TK512.LT_501"
  },
  // Otros objetos...
];

const nombresPersonalizados = {
  "TK2K6.TK512.LT_501": "Nombre Personalizado 1",
  // Otros nombres personalizados...
};

const nuevoArreglo = data.map(objeto => {
  const nombrePersonalizado = nombresPersonalizados[objeto.disp_nombre] || "Nombre Personalizado por Defecto";
  return {
    "Nombre personalizado": nombrePersonalizado,
    "disp_nombre": objeto.disp_nombre,
    "fe_valor": objeto.fe_valor
  };
});

console.log(nuevoArreglo); 

En este ejemplo, hemos definido un objeto nombresPersonalizados que contiene los nombres personalizados asociados a cada disp_nombre. Luego, utilizamos el método map() para iterar sobre cada objeto en el arreglo data. Dentro de la función de mapeo, verificamos si existe un nombre personalizado para el disp_nombre actual utilizando nombresPersonalizados[objeto.disp_nombre]. Si existe, lo asignamos a la variable nombrePersonalizado, de lo contrario, asignamos un "Nombre Personalizado por Defecto". Luego, creamos un nuevo objeto con las propiedades deseadas y lo retornamos.
Al final, el nuevo arreglo nuevoArreglo contendrá los objetos con las propiedades "Nombre personalizado", "disp_nombre" y "fe_valor" que puedes utilizar para mostrar los datos requeridos.
Recuerda ajustar el objeto nombresPersonalizados con los nombres personalizados que necesites.
Espero que esto te ayude a crear el arreglo deseado con los datos requeridos.

*/