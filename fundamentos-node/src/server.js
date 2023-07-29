import http from "http";

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if(method === "GET" && url === '/users'){
        return res.end('Listagem de usuarios');    
    }

    if(method === "POST" && url === '/users'){
        return res.end('Criação de usuario');
    }

    return res.end('Hello, world!');
});

server.listen(3333, () => {
    console.log("Server running on port 3333");
});