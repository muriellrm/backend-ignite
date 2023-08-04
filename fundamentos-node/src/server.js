import http from "node:http";

const users = [];


const server = http.createServer(async (req, res) => {
    const { url, method } = req;

    const buffers = [];

    for await (const chunck of req) {
        buffers.push(chunck);
    }

    try {        
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        req.body = null;
    }

    if (method === "GET" && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    if (method === "POST" && url === '/users') {
        const { name, email } = req.body;
        const id = users.length + 1;
        users.push({
            id,
            name,
            email
        })

        return res.writeHead(201).end();
    }

    return res.writeHead(404).end();
});

server.listen(3333, () => {
    console.log("Server running on port 3333");
});