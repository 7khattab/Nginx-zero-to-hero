const http = require("http");

const server = http.createServer((req, res) => {

    console.log("Request served by BACKEND1");

    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Response From BACKEND1\n");

});

server.listen(3001, "127.0.0.1", () => {
    console.log("BACKEND1 running on port 3001");
});
