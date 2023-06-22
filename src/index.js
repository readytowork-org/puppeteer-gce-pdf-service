const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const generatePDF = require("./pdf");

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
    const username = req.body.username;
    const pdfBuffer = await generatePDF(form_data, username);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=generated.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("An error occurred while generating the PDF.");
  }
});
console.log("Server listenign in port 8080...");
app.listen(8080);

module.exports = { app };
