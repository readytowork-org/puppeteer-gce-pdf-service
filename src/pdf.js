const path = require("path");
const pug = require("pug");
const puppeteer = require("puppeteer");
const { storage } = require("./firebase");
const dotenv = require("dotenv");
const envPath = path.resolve(__dirname, ".env");
dotenv.config({ path: envPath });

const GeneratePDF = async (data) => {
  // Launch a headless browser
  console.log("before launch browser", data);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setContent(data, { waitUntil: "networkidle0" });
  await page.screenshot();

  const orderPdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "40px", // Set the top margin to 40 pixels
      right: "20px", // Set the right margin to 20 pixels
      bottom: "20px", // Set the bottom margin to 20 pixels
      left: "20px", // Set the left margin to 20 pixels
    },
  });
  await browser.close();
  return orderPdfBuffer;
};

const GenerateInvoicePDF = async (data) => {
  // Launch a headless browser
  console.log("before launch browser", data);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setContent(data, { waitUntil: "networkidle0" });
  await page.screenshot();

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "40px", // Set the top margin to 20 pixels
      right: "20px", // Set the right margin to 20 pixels
      bottom: "20px", // Set the bottom margin to 20 pixels
      left: "20px", // Set the left margin to 20 pixels
    },
  });
  await browser.close();
  return pdfBuffer;
};

module.exports = { GeneratePDF, GenerateInvoicePDF };
