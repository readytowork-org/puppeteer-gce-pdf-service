# puppeteer-ce-pdf-service

Nodejs app that generates pdf for any given url

Run Locally:

- Clone the project
- Run `npm-install` to install all dependencies
- Run `npm start` this will start the server in HTTP://localhost:8080

Test:

- Test LIVE
  Send a GET request to `HTTP://34.84.156.66/generate-pdf?url=https://[your_desired_url]`
  Eg: `HTTP://34.84.156.66/generate-pdf?url=https://www.google.com`

- To test in local project:
  Send a GET request to `HTTP://localhost:8080/generate-pdf?url=https://[your_desired_url]`
  Eg: `HTTP://localhost:8080/generate-pdf?url=https://www.google.com`

  What's Included:

  - Express
  - Pug (For Templating)
  - Puppeteer
