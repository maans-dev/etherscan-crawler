const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to Etherscan and perform a search
  await page.goto('https://etherscan.io/');
  await page.type('#txtSearch', '0x123456789abcdefg', { delay: 100 });
  await page.click('#iconSearch');

  // Wait for search results to load
  await page.waitForSelector('#ContentPlaceHolder1_divSummary');

  // Extract data from search results
  const result = await page.evaluate(() => {
    const summary = document.querySelector('#ContentPlaceHolder1_divSummary').innerText;
    const balance = document.querySelector('#ContentPlaceHolder1_divSummary > .row:nth-child(2) > .col-md-8').innerText;
    const txns = document.querySelector('#ContentPlaceHolder1_divSummary > .row:nth-child(3) > .col-md-8').innerText;
    
    return { summary, balance, txns };
  });

  console.log(result);

  await browser.close();
})();
