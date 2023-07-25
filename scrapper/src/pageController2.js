const pageScraper = require('./pageScraper2');

async function scrapeAll(browserInstance2){
	let browser;
	try{
		browser = await browserInstance2;
		const dato = await pageScraper.scraper2(browser);
		return dato
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance2) => scrapeAll(browserInstance2)
