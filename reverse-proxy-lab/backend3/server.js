const http = require("http");

const server = http.createServer((req, res) => {

    console.log("Request served by BACKEND3");

    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Response From BACKEND3\n");

});

server.listen(3003, "127.0.0.1", () => {
    console.log("BACKEND3 running on port 3003");
});
