import express from "express";
import path from "path";
const browserObject = require("./browser"); // Instancia del Explorador por linea de comandos
const scraperController = require("./pageController"); // Controlador de Recoleccion de puntos Analogicos
const scraperController2 = require("./pageController2"); // Controlador de Recoleccion de puntos Digitales

// Initializations
const app = express();

// Settings
app.set("port", process.env.PORT || 3200);

app.listen(app.get("port"), async () => {
  console.log("app server on port", app.get("port"));
});

// Recoleccion de puntos Analógicos

app.get("/results", async (req: any, res: any) => {
  //Start the browser and create a browser instance
  let browserInstance = browserObject.startBrowser();

  // Pass the browser instance to the scraper controller
  const data: any = await scraperController(browserInstance);
  const body = filteredData(data[0])
  console.log("Datos Analogicos", body.new_data.lenght)
  res.json({
    data: body.new_data,
    length: body.new_data.length 
  });
});

const filteredData = (data: Array<any>) => {
  const new_data: any = [];
  let rowLength = 28;
  let row = 28;
  let minIndex = 1;
  let maxIndex = 28;
  let group: any = []

  data?.forEach((value, index) => {
    if (index < data.length - 1) {
      // añado el row length a la condicional para comenzar a contar a partir
      // de la segunda iteracion.
      if (index >= minIndex && index <= maxIndex && index > rowLength) {
        // inserto los datos de la columna Nombre
        group.push(value)
      }
      // al llegar al final de la fila aumento los indices para poder 
      // añadir la info de la siguiente fila
      // reset
      if (index === row) {
        minIndex += rowLength;
        maxIndex += rowLength;
        row += rowLength;
        new_data.push(group)
        group = []
      }
    }
  });

  // TODO: mejorar
  new_data.shift();

  return {
    new_data
  };
};

// Recoleccion de puntos Digitales

app.get("/results2", async (req: any, res: any) => {
  //Start the browser and create a browser instance
  let browserInstance2 = browserObject.startBrowser();

  // Pass the browser instance to the scraper controller
  const dato: any = await scraperController2(browserInstance2);
  const body = filteredData2(dato[0])
  console.log("Datos Digitales", body.new_dato.lenght)
  res.json({
    data: body.new_dato,
    length: body.new_dato.length 
  });
});
const filteredData2 = (dato: Array<any>) => {
  const new_dato: any = [];
  let rowLength = 24;
  let row = 24;
  let minIndex = 1;
  let maxIndex = 24;
  let group: any = []

  dato?.forEach((value, index) => {
    if (index < dato.length - 1) {
      // añado el row length a la condicional para comenzar a contar a partir
      // de la segunda iteracion.
      if (index >= minIndex && index <= maxIndex && index > rowLength) {
        // inserto los datos de la columna Nombre
        group.push(value)
      }
      // al llegar al final de la fila aumento los indices para poder 
      // añadir la info de la siguiente fila
      // reset
      if (index === row) {
        minIndex += rowLength;
        maxIndex += rowLength;
        row += rowLength;
        new_dato.push(group)
        group = []
      }
    }
  });

  // TODO: mejorar
  new_dato.shift();

  return {
    new_dato
  };
};

