const scraperObject = {
  url: "http://167.175.224.135/AcquisitionData.html", // http://167.175.224.135/AcquisitionData.html
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
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
  
  return data

    // let urls = await page.$$eval('section ol > li', links => {
    // 	// Make sure the book to be scraped is in stock
    // 	links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
    // 	// Extract the links from the data
    // 	links = links.map(el => el.querySelector('h3 > a').href)
    // 	return links;
    // });
  },


};

module.exports = scraperObject;