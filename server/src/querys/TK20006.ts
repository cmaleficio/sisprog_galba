require("dotenv").config();
const { Pool, Client } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const rows = [
  "Nivel de Tanque | Nivel de Interfaz | Temperatura",
  "Temperatura 16' |Temperatura 14' | Temperatura 11'",
  "Instrumentos de Control",
];

const colunn_title: any = {
  "Nivel de Tanque | Nivel de Interfaz | Temperatura": ["Pulg", "Pulg", "°F"],
  "Temperatura 16' |Temperatura 14' | Temperatura 11'": ["Pulg", "SetPoint", "%"],
  "Instrumentos de Control": ["Pulg", "SetPoint", "%"],
};

const rows_and_points: any = {
  "Nivel de Tanque | Nivel de Interfaz | Temperatura": [36554916, 36554911, 36554899],
  "Temperatura 16' |Temperatura 14' | Temperatura 11'": [36554902, 36554901, 36554900],
  "Instrumentos de Control": [36554905, 36554918, 36554919],
};

const rows_and_color: any = {
  "Nivel de Tanque | Nivel de Interfaz | Temperatura": "primary",
  "Temperatura 16' |Temperatura 14' | Temperatura 11'": "secondary",
  "Instrumentos de Control": "warning",
};

const get_point_information = function (id: any) {
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

const get_point_graph_values = function (id: any) {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM t012_historico_tag WHERE historico_tag_id in (${id}) ORDER BY fe_valor DESC LIMIT 7`,
      function (err: any, result: any) {
        if (err) return reject(err);
        resolve(result.rows);
      }
    );
  });
};

const get_points_data_for_the_row = async (
  title: string,
  pointsIds: Array<number>
) => {
  const points = await Promise.all(
    pointsIds.map(async (id, index) => {
      const point_information: any = await get_point_information(id);
      const point_graph_values: any = await get_point_graph_values(id);
      return {
        realtimeData: point_information.map((value: any) => {
          return {
            ...value,
            title: `${value?.nu_valor} ${colunn_title[title][index]}`,
          };
        }),
        graphData: {
          labels: point_graph_values.map((value: any) => value.fe_valor),
          datasets: [
            {
              label: "LIT_250130",
              data: point_graph_values.map((value: any) => value.nu_valor),
              backgroundColor: ["#ecf0f1"],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        },
      };
    })
  );

  return points;
};

export const get_response2 = async () => {
  const data = await Promise.all(
    rows.map(async (title: string, index) => {
      return {
        title: rows[index],
        color: rows_and_color[title],
        points: await get_points_data_for_the_row(
          title,
          rows_and_points[title]
        ),
      };
    })
  );
  return data;
};

export const getSisprogData2 = async (req: any, response: any) => {
  get_response2().then((data) => {
    response.status(200).json(data);
  });
};
