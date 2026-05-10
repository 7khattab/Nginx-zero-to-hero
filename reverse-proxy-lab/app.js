const http = require("http");

const server = http.createServer((req, res) => {

    console.log("Host:", req.headers.host);
    console.log("Client IP:", req.headers["x-forwarded-for"]);

    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Reverse Proxy Working\n");

});

server.listen(3000, "127.0.0.1", () => {
    console.log("Server running on port 3000");
});
