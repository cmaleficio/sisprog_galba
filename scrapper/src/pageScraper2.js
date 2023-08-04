const axios = require('axios');

const scraperObject = {
  url: "http://167.175.224.142/AcquisitionData.html",

  async scraper(browser) {
    console.log("Awaiting DIG")
    const response = await axios.head(scraperObject.url);
    console.log("Res DIG: ", response.status)
    while (response.status === 200) {
      try {
        // La URL está disponible, proceder con la solicitud GET
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
        // Procesar los datos obtenidos
        break

      } catch (error) {
        // Ocurrió un error al realizar la solicitud HEAD
        console.error('Error al verificar la disponibilidad de la URL:', error.message);
      }

    }
    await new Promise(resolve => setTimeout(resolve, 10000))
  }
}

module.exports = scraperObject;