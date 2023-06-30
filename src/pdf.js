const path = require("path");
const pug = require("pug");
const puppeteer = require("puppeteer");
const { storage } = require("./firebase");

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
  console.log("before launch browser", userHtmlBody);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // await page.goto("data:text/html;charset=UTF-8," + userHtmlBody, {
  //   waitUntil: "networkidle0",
  // });
  // await page.goto("data:text/html," + userHtmlBody, {
  //   waitUntil: "networkidle2",
  // });
  await page.setContent(userHtmlBody, { waitUntil: "networkidle0" });
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
  // upload to firebase storage
  try {
    const bucketRef = storage.bucket("gs://lp-maker.appspot.com");
    const file = bucketRef.file(`puppeteer/sumit999.pdf`);
    const signedUrl = await file.getSignedUrl({
      action: "read",
      expires: "03-01-3000", // will not expire
    });
    const stream = file.createWriteStream({
      resumable: false,
      metadata: {
        contentType: "application/pdf",
      },
    });

    stream.on("error", (error) => {
      console.error("Error uploading PDF:", error);
      const err = new Error(error);
      return ["", err];
    });

    stream.on("finish", () => {
      console.log("PDF uploaded successfully!");
    });
    console.log("signer url", signedUrl);
    stream.end(pdfBuffer);
    return signedUrl;
  } catch (error) {
    console.log("Error while uploading pdf to fireabse storage", error);
    return error;
  }
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
