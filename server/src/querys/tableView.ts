require("dotenv").config();
const { Pool, Client } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// Tabla con el nombre personalizado

const title = [
  "TK-20006",
  "V-2501",
  "EX-002",
  "TK501/2",
  "Tanque 1500 BL",
  "Salida Crudo V-2501",
  "Salida Agua V-2501",
  "Salida Gas V-2501",
]

const id: any = {
  "TK-20006": [ 36554916, 36554911, 36554899, 36554900, 36554901, 36554902],
  "V-2501": [36554767, 36554770, 36554771, 36554772, 36554777, 36554778],
  "EX-002": [36554946, 36554952, 36554957, 36554956],
  "TK501/2": [36554874, 36554875, 36554869],
  "Tanque 1500 BL": [36554867, 36554952],
  "Salida Crudo V-2501":[36554808, 36554801, 36554800, 36554799, 36554798, 36554797],
  "Salida Agua V-2501":[36554804, 36554789, 36554788, 36554787, 36554786, 36554785],
  "Salida Gas V-2501":[36554805, 36554794, 36554793, 36554792, 36554791, 36554790],
}

const colunn_title: any = {
  "TK-20006": ["Nivel de Crudo", "Nivel de Interfaz", "Temp. a 16'", "Temp. a 14'", "Temp. a 11'", "Temperatura Promedio"],
  "V-2501": ["Nivel de Interfaz V-2501", "Nivel de salida de Crudo", "Control de Interfaz", "Set Point", "Control de Crudo", "Set Point"],
  "EX-002": ["Temperatura", "Presión de Gas de Quemadores", "Control de Presión","Set Point"],
  "TK501/2": ["Nivel de Tanque", "Flujo de Crudo", "Presión en Descarga"],
  "Tanque 1500 BL": ["Nivel de Tanque 1500 BL", "Presión en Descarga"],
  "Salida Crudo V-2501":["Flujo instantáneo", "Volumen del dia en curso", "Volumen de cierre a 24 H", "Volumen de Cierre a 48 H", "Volumen de Cierre Mes en curso", "Volumen de Cierre Mes Anterior"],
  "Salida Agua V-2501":["Flujo instantáneo", "Volumen del dia en curso", "Volumen de cierre a 24 H", "Volumen de Cierre a 48 H", "Volumen de Cierre Mes en curso", "Volumen de Cierre Mes Anterior"],
  "Salida Gas V-2501":["Flujo instantáneo", "Volumen del dia en curso", "Volumen de cierre a 24 H", "Volumen de Cierre a 48 H", "Volumen de Cierre Mes en curso", "Volumen de Cierre Mes Anterior"],
};

const unidad: any = {
  "TK-20006": [ "Pies", "Pies", "°F", "°F", "°F", "°F"],
  "V-2501": ["Pulg", "Pulg", "", "SP","", "SP"],
  "EX-002": ["°F", "PSI", "", "SP"],
  "TK501/2": ["Pies", "BRLs", "Presión en descarga"],
  "Tanque 1500 BL": ["Pies","Presión en descarga"],
  "Salida Crudo V-2501":["BPD", "BLS", "BLS", "BLS", "BLS", "BLS"],
  "Salida Agua V-2501":["BPD", "BLS", "BLS", "BLS", "BLS", "BLS"],
  "Salida Gas V-2501":["MMPCND", "MMPCN", "MMPCN", "MMPCN", "MMPCN", "MMPCN"],
}

export const get_table_information = function (id: any) {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM t011_real_tag WHERE real_tag_id in (${id})`,
      function (err: any, result: any) {
        if (err) return reject(err);
        resolve(result.rows);
      }
    );
  });
};

export const get_data_for_the_table= async (
  titles:string,
  pointsIds: Array<number>
) => {
  const points = await Promise.all(
    pointsIds.map(async (id, index) => {
      const table_information: any = await get_table_information(id);
      return {
        tableData: table_information.map((value: any) => {
          return {
            ...value,
            title: `${colunn_title[titles][index]}`, //${value?.nu_valor}
            unidad: `${unidad[titles][index]}`,
          };
        }
      )}
    })
  );

  return points;
};

export const get_response = async () => {
  const data = await Promise.all(
    title.map(async (titles: string, index) => {
      return {
        title: title[index],
        data: await get_data_for_the_table(
          titles,
          id[titles]
        ),
      };
    })
  );
  return data;
};

export const getTableView = async (req: any, response: any) => {
  get_response().then((data) => {
    response.status(200).json(data);
  });
};