const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { GeneratePDF, validateUrl, GenerateURLIntoPDF } = require("./pdf");

const app = express();

app.use(bodyParser.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/health-check", async (req, res) => {
  res.send("API running....");
});

app.post("/lp-maker/generate-pdf", async (req, res) => {
  try {
    console.log("req:", req.body);
    const form_data = req.body.form_data;
    const pdfBuffer = await GeneratePDF(form_data);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=generated.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("An error occurred while generating the PDF.");
  }
});
app.get("/generate-pdf", async (req, res) => {
  try {
    const queryUrl = req.query.url;
    console.log({ queryUrl });
    console.log("re:", req.query);
    try {
      validateUrl(queryUrl);

      const pdfBuffer = await GenerateURLIntoPDF(queryUrl);

      res.set("Content-Type", "application/pdf");
      res.set("Content-Disposition", 'attachment; filename="output.pdf"');
      res.send(pdfBuffer);
    } catch (error) {
      console.error(error);
      res.status(400).send("Invalid URL");
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("An error occurred while generating the PDF.");
  }
});
console.log("Server listenign in port 8080...");
app.listen(8080);

module.exports = { app };
