const http = require("http");
const fs = require("fs").promises;

const hostname = "127.0.0.1";
const port = 3000;

// define server : create server, send code, header, end
const server = http.createServer((req, res) => {
  fs.readFile(__dirname + "/data/file.html")
    .then((contents) => {
      console.log(contents); //   prepare and send an OK response
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(contents);
    })
    .catch((err) => {
      res.writeHead(500);
      res.end(err);
    });
});

// send the data to web browser
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
