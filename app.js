const express = require("express");
const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");

const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/public`));

const advicePage = fs.readFileSync(`${__dirname}/templates/index.html`, "utf-8");

app.get("/", async (req, res) => {
  const response = await getAdvice();
  const $ = cheerio.load(advicePage);

  $("h1").text(response.advice);
  $("p.advice-id").text("ADVICE #" + response.id);

  res.end($.html());
});

app.get("/", (req, res) => {});

const getAdvice = async () => {
  try {
    const response = await axios.get("https://api.adviceslip.com/advice");
    return response.data.slip;
  } catch (error) {
    return error;
  }
};

app.listen(port, () => {
  console.log(`Server is listeing on port ${port}!`);
});
