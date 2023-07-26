const scraperObject = {
  url: "http://167.175.224.142/AcquisitionData.html", // http://167.175.224.142/AcquisitionData.html
  async scraper2(browser) {
    let dato = null;
    let page = null;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        page = await browser.newPage();
        console.log(`Navigating to ${this.url}... Digitales`);
        await page.goto(this.url, { timeout: 60000 });
        // Wait for the required DOM to be rendered
        await page.waitForSelector("body");
        // Get the link to all the required books

        dato = await page.$$eval("body > div > table", (tables) => {
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

        await browser.close()
        break; // Salir del bucle si la navegación y extracción de datos fue exitosa
      } catch (error) {
        console.error("Error de navegación:", error);
        retryCount++;
        console.log(`Reintentando (${retryCount}/${maxRetries})...`);
      } finally {
        await browser.close()
      }
    }

    return dato;
  },
};

module.exports = scraperObject;

