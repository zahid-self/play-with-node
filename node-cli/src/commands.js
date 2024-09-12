import puppeteer from 'puppeteer';

export const getTitle = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const title = await page.title();
  return title
}