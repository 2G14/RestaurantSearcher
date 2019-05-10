const path = require("path");

require("dotenv").config(); // .envを利用
const port = process.env.SERVER_PORT; // server port
const keyid = process.env.GNAVI_ACCESS_KEY; // ぐるなびAPI keyを取得

const gnavi = require("./gnavi");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());

const magenta = "\u001b[35m";
const blue = "\u001b[34m";
const reset = "\u001b[0m";

app.use(function(req, res, next) {
  console.log(magenta + "GET Request: \n" + reset, path.basename(req.url));
  next();
});
app.use(express.static(path.resolve(__dirname, "../", "build")));
app.post("/search", function(req, res) {
  console.log(magenta + "POST Request: \n" + reset, JSON.stringify(req.body));
  gnavi(keyid, req.body, body => {
    console.log(blue + "GnaviAPI Response: \n" + reset, JSON.parse(body));
    return res.status(200).send(body);
  });
});

module.exports = { app, port };
