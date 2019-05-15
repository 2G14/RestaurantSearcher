const http = require("http");

const server = require("./server");

http.createServer(server.app).listen(process.env.PORT || server.port, function() {
  console.log("http server listening on ", server.port, " port.");
});
