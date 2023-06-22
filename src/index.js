const express = require('express');
const puppeteer = require('puppeteer');
const { executablePath } = require('./.puppeteerrc.cjs');

const app = express();

app.get('/health-check', async(req, res)=>{
    res.send("API running....");
})

app.get('/', async(req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless:true,
        });
        const page = await browser.newPage();
        
        // Perform necessary operations on the page
        await page.goto('https://sales-agent.co.jp/');
        // ...
    
        // Generate PDF
        const pdfBuffer = await page.pdf({ format: 'A4' });
        
        await browser.close();
    
        // Send PDF in the response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');
        res.send(pdfBuffer);
      } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('An error occurred while generating the PDF.');
      }
});
console.log("Server listenign in port 8080...")
app.listen(8080);