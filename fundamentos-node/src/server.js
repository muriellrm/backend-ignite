import http from "http";


const users = [];


const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (method === "GET" && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    if (method === "POST" && url === '/users') {
        const id = users.length + 1;
        users.push({
            id,
            name: `Usuario ${id}`,
            email: `usuario${id}@example.com`
        })

        return res.end('Criação de usuario');
    }

    return res.end('Hello, world!');
});

server.listen(3333, () => {
    console.log("Server running on port 3333");
});