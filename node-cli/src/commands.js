import puppeteer from 'puppeteer';
import { writeFile } from "node:fs/promises";

function getFileName(url) {
  const fileNameArr = url.split("//");
  const fileName = fileNameArr[1].replace(/\//g, "");
  return fileName;
}

export const getTitle = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto(url);
    const title = await page.title();
    const fileName = getFileName(url);
    const filePath = new URL(`../public/${fileName}.json`, import.meta.url);
    try {
      await writeFile(filePath, JSON.stringify(await page.content(), null, 2), { flag: 'wx' });
    } catch (error) {
      if (error.code === "EEXIST") {
        await writeFile(filePath, JSON.stringify(await page.content(), null, 2));
      }
    }
    return title
  } catch (error) {
    console.log(error)
  } finally {
    await page.close();
    await browser.close();
  }
}