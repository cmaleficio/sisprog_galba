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
  "Entrada de Liquido",
  "Salida Control de Crudo",
  "Salida Control de Presión",
  "Flujo de crudo",
  "Flujo de Agua",
];

const colunn_title: any = {
  "Entrada de Liquido": ["Pulg", "SetPoint", "%"],
  "Salida Control de Crudo": ["Pulg", "SetPoint", "%"],
  "Salida Control de Presión": ["Pulg", "SetPoint", "%"],
  "Flujo de crudo": ["BOPD", "BOPD", "BOPD"],
  "Flujo de Agua": ["BaPD", "BaPD", "BaPD"],
};

const rows_and_points: any = {
  "Entrada de Liquido": [36554767, 36554772, 36554771],
  "Salida Control de Crudo": [36554770, 36554778, 36554779],
  "Salida Control de Presión": [36554753, 36554758, 36554759],
  "Flujo de crudo": [36554808, 36554806, 36554807],
  "Flujo de Agua": [36554804, 36554802, 36554803],
};

const rows_and_color: any = {
  "Entrada de Liquido": "primary",
  "Salida Control de Crudo": "secondary",
  "Salida Control de Presión": "warning",
  "Flujo de crudo": "success",
  "Flujo de Agua": "secondary",
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

export const get_response = async () => {
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

export const getSisprogData = async (req: any, response: any) => {
  get_response().then((data) => {
    response.status(200).json(data);
  });
};
