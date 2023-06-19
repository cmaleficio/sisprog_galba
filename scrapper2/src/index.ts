import express from "express";
import path from "path";
const browserObject = require("./browser");
const scraperController = require("./pageController");
// importing routes

// Initializations
const app = express();

// Settings
app.set("port", process.env.PORT || 3201);

app.listen(app.get("port"), async () => {
  console.log("app server on port", app.get("port"));
});

app.get("/results", async (req, res) => {
  //Start the browser and create a browser instance
  let browserInstance = browserObject.startBrowser();

  // Pass the browser instance to the scraper controller
  const data: any = await scraperController(browserInstance);
  const body = filteredData(data[0])
  console.log("body ", body)
  res.json({
    data: body.new_data,
    length: body.new_data.length 
  });
});

/* app.get("/digital", async (req, res) => {
  //Start the browser and create a browser instance
  let browserInstance2 = browserObject.startBrowser();

  // Pass the browser instance to the scraper controller
  const dato: any = await scraperControllerSecond(browserInstance2);
  const body = filteredData2(dato[0])
  console.log("body ", body)
  res.json({
    dato: body.new_dato,
    length: body.new_dato.length 
  });
}); */


const filteredData = (data: Array<any>) => {
  const new_data: any = [];
  let rowLength = 24;
  let row = 24;
  let minIndex = 1;
  let maxIndex = 24;
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

