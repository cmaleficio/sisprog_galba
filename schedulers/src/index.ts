require("dotenv").config();
const cron = require("node-cron");
import express from "express";
import path from "path";
const axios = require("axios");

import { isDatabaseConnected, saveDataOnDatabaseHistorico, saveDataOnDatabaseReal, saveDataOnDatabaseReal2, saveDataOnDatabaseHistorico2 } from "./database";
// importing routes
import IndexRoutes from "./routes";

// Initializations
const app = express();
import "./database";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1', IndexRoutes)

// Statics
app.use(express.static(path.join(__dirname, "public")));
// Starting server

// search information on screapper

const get_information_from_scrapper = async () => {
  try {
    const scrapper_url = "http://localhost:3200/results";
    const { data } = await axios.get(scrapper_url);
    return data;
  } catch (error) {
    console.error(
      "Ha ocurrido un error marfisis por favor revisa lo que haces => ",
      error
    );
    return false;
  }
};
const get_information_from_scrapper2 = async () => {
  try {
    const scrapper_url = "http://localhost:3200/results2";
    const { data } = await axios.get(scrapper_url);
    return data;
  } catch (error) {
    console.error(
      "Ha ocurrido un error marfisis por favor revisa lo que haces => ",
      error
    );
    return false;
  }
};

// cron

let isRequestPending = false;

cron.schedule("*/10 * * * * *", async function () {
  if (isRequestPending) {
    console.log("Petición anterior aún está pendiente. Esperando...");
    return;
  } else {
    console.log("Iniciando ---------------------Analogicos TR");
    isRequestPending = true;
    try {
      const data_from_scrapper = await get_information_from_scrapper();
      if (data_from_scrapper) {
        const hasConexionWithDatabase = await isDatabaseConnected();
        console.log(`la base de datos esta conectada ? ${hasConexionWithDatabase}`);
        if (hasConexionWithDatabase) {
          console.log(`BD conectada, ACTUALIZANDO DATA EN REALTIME`);
          saveDataOnDatabaseReal(data_from_scrapper.data);
          isRequestPending = false;
        } else {
          console.log(`He tenido algún problema al conectarme a la base de datos`);
        }
      }
    } catch (error) {
      console.log(`Error al obtener información del scrapper: ${error}`);
    }
  }
  console.log("Analogicos Tiempo Real 10 Segundos");
});

let isRequestPending2 = false;

cron.schedule("*/10 * * * * *", async function () {
  if (isRequestPending2) {
    console.log("Petición anterior aún está pendiente. Esperando...");
    return;
  } else {
    console.log("iniciando --------------------- Digitales TR");
    const data_from_scrapper = await get_information_from_scrapper2();
    if (data_from_scrapper) {
      const hasConexionWithDatabase = await isDatabaseConnected();
      console.log(`la base de datos esta conectada ? ${hasConexionWithDatabase}`);
      if (hasConexionWithDatabase) {
        console.log(`La base de datos esta conectada, hare el insert`); //console.log("data_from_scrapper.data", data_from_scrapper.data)
        saveDataOnDatabaseReal2(data_from_scrapper.data);
        isRequestPending2 = false;
      } else {
        console.log(
          `He tenido algun problema a la hora de conectarme a la base de datos`
        );
      }
    }
  }
  console.log("Digitales Tiempo Real 10 Segundos");
});

let isRequestPending3 = false;

cron.schedule("*/5 * * * *", async function () {
  if (isRequestPending3) {
    console.log("Petición anterior aún está pendiente. Esperando...");
    return;
  } else {
    console.log("iniciando --------------------- Analogicos HT");
    const data_from_scrapper = await get_information_from_scrapper();
    if (data_from_scrapper) {
      const hasConexionWithDatabase = await isDatabaseConnected();
      console.log(`la base de datos esta conectada ? ${hasConexionWithDatabase}`);
      if (hasConexionWithDatabase) {
        console.log(`La base de datos esta conectada, hare el insert`); //console.log("data_from_scrapper.data", data_from_scrapper.data)
        saveDataOnDatabaseReal(data_from_scrapper.data);
        isRequestPending3 = false;
      } else {
        console.log(
          `He tenido algun problema a la hora de conectarme a la base de datos`
        );
      }
    }
  }
  console.log("Analogicos Historico");
});
let isRequestPending4 = false;

cron.schedule("*/5 * * * *", async function () {
  if (isRequestPending4) {
    console.log("Petición anterior aún está pendiente. Esperando...");
    return;
  } else {
    console.log("iniciando --------------------- Digitales HT");
    const data_from_scrapper = await get_information_from_scrapper2();
    if (data_from_scrapper) {
      const hasConexionWithDatabase = await isDatabaseConnected();
      console.log(`la base de datos esta conectada ? ${hasConexionWithDatabase}`);
      if (hasConexionWithDatabase) {
        console.log(`La base de datos esta conectada, hare el insert`); //console.log("data_from_scrapper.data", data_from_scrapper.data)
        saveDataOnDatabaseReal2(data_from_scrapper.data);
        isRequestPending4 = false;
      } else {
        console.log(
          `He tenido algun problema a la hora de conectarme a la base de datos`
        );
      }
    }
  }
  console.log("Digitales Historico");
});
