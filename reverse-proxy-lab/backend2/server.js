const http = require("http");

const server = http.createServer((req, res) => {

    console.log("Request served by BACKEND2");

    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Response From BACKEND2\n");

});

server.listen(3002, "127.0.0.1", () => {
    console.log("BACKEND2 running on port 3002");
});
