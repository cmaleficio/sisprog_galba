require("dotenv").config();
import express from "express";
import http, { get } from "http";
import { Server } from "socket.io";
import path from "path";
import { isDatabaseConnected, getHistorico, getRealTimeData } from "./database";
const { Pool, Client } = require("pg");

// importing routes
import IndexRoutes from "./routes";
import cors from "cors";
import corsOptions from "./configs/corsOptions";
import { getSisprogData, get_response } from "./querys/V2501";
import { getSisprogData2 } from "./querys/TK20006";
import { getGraphV2501 } from "./querys/graph/graph_v_2501";

// Initialization
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));

//Pool for DB connection
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// Settings
app.set("port", process.env.PORT || 3300);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1", IndexRoutes);
app.get("/results", getHistorico);
app.get("/rtd", getRealTimeData);

// EQUIPOS

app.get("/V2501", getSisprogData);
app.get("/TK20006", getSisprogData2);

// GRAFICAS

app.get("/Graph_v2501", getGraphV2501);

// Socket.io events
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });

  client.connect(async (err: any, res: any) => {
    if (err) {
      console.log("Error Conectando a la DB", err);
    } else {
      client.on("notification", async (msg: any) => {
        pool.query(
          "SELECT * FROM t011_real_tag ORDER BY real_tag_id ASC",
          (error: any, results: any) => {
            if (error) {
              throw error;
            }
            io.emit("data", {
              data: results.rows,
            });
          }
        );

        const sisprogdata = await get_response()
        io.emit("sisprogdata", {
          data: sisprogdata,
        })
      });
      const query = await client.query("LISTEN t11update");
      //console.log(query)
    }
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });

  socket.on("error", (err) => {
    console.log(`Error: ${err}`);
  });
});

server.listen(app.get("port"), async () => {
  const hasConexionWithDatabase = await isDatabaseConnected();
  console.log(`Conectado a la base de datos: ${hasConexionWithDatabase}`);
  console.log("App server on port", app.get("port"));
});

export { io };
