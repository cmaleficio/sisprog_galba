require("dotenv").config();
const cron = require("node-cron");
import express from "express";
import path from "path";
const axios = require("axios");
import { makeDatabaseBackup } from "./backup";

import { isDatabaseConnected, save_data_on_database } from "./database";
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

// cron

cron.schedule("*/30 * * * * *", async function () {
  console.log("---------------------");
  const data_from_scrapper = await get_information_from_scrapper();
  if (data_from_scrapper) {
    //console.log(data_from_scrapper)
    //  save on database
    const hasConexionWithDatabase = await isDatabaseConnected();
    console.log(`la base de datos esta conectada ? ${hasConexionWithDatabase}`);
    if (hasConexionWithDatabase) {
      console.log(`La base de datos esta conectada, hare el insert`);
      //console.log("data_from_scrapper.data", data_from_scrapper.data)
      save_data_on_database(data_from_scrapper.data);
    } else {
      console.log(
        `He tenido algun problema a la hora de conectarme a la base de datos`
      );
    }
  }
  console.log("running a task every 30 seconds");
  console.log("---------------------");
});