import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
    _transform(chunk, _, callback) {
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed);
        callback(null, Buffer.from(`${transformed}`));
    }
}

const server = http.createServer(async (req, res) => {
    
    const buffers = [];

    for await (const chunck of req) {
        buffers.push(chunck);
    }

    const fullbody = Buffer.concat(buffers).toString();

    console.log(fullbody);

    return res.end(fullbody);

    // return req
    // .pipe(new InverseNumberStream())
    // .pipe(res);

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});