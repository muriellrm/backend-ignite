import http from "http";

const server = http.createServer((req, res) => {
    return res.end('Hello, world!');
});

server.listen(3333, () => {
    console.log("Server running on port 3333");
});