const https = require("https");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // .envを利用
const ssl_key = process.env.HTTPS_KEY_FILE_PATH; // ssl key
const ssl_cert = process.env.HTTPS_CERT_FILE_PATH; // ssl cert

const server = require("./server");

/**
 * ssl　key & cert
 */
const options = {
  key: fs.readFileSync(path.resolve(__dirname, "../", ssl_key)),
  cert: fs.readFileSync(path.resolve(__dirname, "../", ssl_cert))
};
https.createServer(options, server.app).listen(server.port, function() {
  console.log("https server listening on ", server.port, " port.");
});
