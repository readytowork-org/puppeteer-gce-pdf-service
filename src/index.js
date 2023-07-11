const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { GeneratePDF, GenerateInvoicePDF } = require("./pdf");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text({ type: "*/*" }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/health-check", async (req, res) => {
  res.send("API running....");
});

app.post("/lp-maker/generate-pdf", async (req, res) => {
  try {
    const form_data = req.body.form_data;
    const pdfUrl = await GeneratePDF(form_data);
    res.send(pdfUrl);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("An error occurred while generating the PDF.");
  }
});

app.post("/lp-maker/generate-invoice-pdf", async (req, res) => {
  try {
    console.log("req:", req.body);
    const pdf_url = await GenerateInvoicePDF(req.body);

    res.send(pdf_url);
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    res.status(500).send("An error occurred while generating the invoice PDF.");
  }
});

console.log("Server listenign in port 8080...");
app.listen(8080);

module.exports = { app };
