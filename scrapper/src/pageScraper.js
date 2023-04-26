const scraperObject = {
  url: "http://localhost:5500/", //http://167.175.224.146/AcquisitionData.html (ip del HTML) - ip local http://127.0.0.1:5500/html/index.html
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    // Wait for the required DOM to be rendered
    await page.waitForSelector("body");
    // Get the link to all the required books
    // Devuelve la tabla Puntos Analogicos
    const data = await page.$$eval("body > div > table", (tables) => {
      return tables
        .slice(2)
        .filter(
          (htmlElement) =>
            htmlElement.querySelector("tbody > tr > td > font > b > a")
              .textContent === " Puntos Anal�gicos" //    Puntos Anal�gicos
        )
        .map((htmlElement) =>
          [...htmlElement.querySelectorAll("td")].map((e) =>
            e.textContent.trim()
          )
        ); 
    });
    /* data = [analogData,dispData]; */

    await browser.close();
    return data
  },
};

module.exports = scraperObject;
