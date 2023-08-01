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
];

const colunn_title: any = {
  "Entrada de Liquido": ["Pulg", "SetPoint", "%"],
};

const rows_and_points: any = {
  "Entrada de Liquido": [36554767, 36554772, 36554771],
};

const rows_and_color: any = {
  "Entrada de Liquido": "primary",
};

const get_point_graph_values = function (id: any) {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM t012_historico_tag WHERE historico_tag_id in (${id}) ORDER BY fe_valor ASC LIMIT 7`,
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
      const point_graph_values: any = await get_point_graph_values(id);
      return {
          graphData: {
          labels: point_graph_values.map((value: any) => value.fe_valor),
          datasets: [
            {
              label: "",
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

export const getGraphV2501 = async (req: any, response: any) => {
  get_response().then((data) => {
    response.status(200).json(data);
  });
};
