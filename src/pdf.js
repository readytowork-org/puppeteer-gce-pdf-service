const path = require("path");
const pug = require("pug");
const puppeteer = require("puppeteer");
const fontpath = __dirname + "/fonts/noto-sans-jp.ttf";

const GeneratePDF = async (data) => {
  // pug templaing fo pdf
  const pdfTemplate = path.join(__dirname, "views", "pdftemplate.pug");
  const compiledTemplate = pug.compileFile(pdfTemplate);
  const optionsSubCategory = ["オプション", "制作プラン"];
  // process options data -> since options answer are in strings, json parse the options and update the array
  // to simplify the pug templating
  // if new options added, update in pdf template
  data.forEach((item) => {
    if (optionsSubCategory.includes(item.sub_category_title)) {
      const parsedAnswers = JSON.parse(item.questions[0].answer);
      item.questions[0].answer = parsedAnswers;
    }
  });
  const userHtmlBody = compiledTemplate({
    data: data,
  });
  // Launch a headless browser
  console.log("before launch browser");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.addStyleTag({
    content: `@font-face {
      font-family: 'Noto Sans JP';
      src: url("https://fonts.gstatic.com/ea/notosansjp/v5/NotoSansJP-Regular.woff") format('woff');
      body {
        font-family: 'Noto Sans JP', sans-serif;
      }
    }`,
  });
  // await page.goto("data:text/html," + userHtmlBody);
  await page.evaluateHandle("document.fonts.ready");
  await page.setContent(userHtmlBody);
  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "40px", // Set the top margin to 20 pixels
      right: "20px", // Set the right margin to 20 pixels
      bottom: "20px", // Set the bottom margin to 20 pixels
      left: "20px", // Set the left margin to 20 pixels
    },
    printBackground: true,
  });
  await browser.close();
  // Convert the pdfBuffer variable to a string
  return await pdfBuffer;
};

const GenerateURLIntoPDF = async (url) => {
  // Launch a headless browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4" });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
};

function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { GeneratePDF, validateUrl, GenerateURLIntoPDF };
