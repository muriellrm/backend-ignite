import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
    _transform(chunk, _, callback) {
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed);
        callback(null, Buffer.from(`${transformed}`));
    }
}

const server = http.createServer((req, res) => {
    return req
    .pipe(new InverseNumberStream())
    .pipe(res);

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});