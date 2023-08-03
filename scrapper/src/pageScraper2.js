const axios = require('axios');

const scraperObject = {
  url: "http://167.175.224.142/AcquisitionData.html",
  
  async scraper2(browser) {
    console.log("Verificando conexion con HTML -Digitales-")
    let response = await axios.head (scraperObject.url)
    //console.log(response)
    if(response.status === 200){
      console.log("Result:", response.status)
      let page = await browser.newPage();
      console.log(`Navigating to ${this.url}... Digitales`);
      await page.goto(this.url);
      // Wait for the required DOM to be rendered
      await page.waitForSelector("body");
      // Get the link to all the required books
      
      const data = await page.$$eval("body > div > table", (tables) => {
        return tables
          .slice(2)
          .filter(
            (htmlElement) =>
              htmlElement.querySelector("tbody > tr > td > font > b > a")
                .textContent === " Puntos Digitales" //
          )
          .map((htmlElement) =>
            [...htmlElement.querySelectorAll("td")].map((e) =>
              e.textContent.trim()
            )
          );
      });
      await browser.close();
      return data;
    } else {
      console.log("Enlace no disponible")
      console.error("Error en la solicitud HTTP GET:", error.message);
      console.log("Esperando 5 segundos para volver a intentar...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.scraper();
    }
  },
};

module.exports = scraperObject;