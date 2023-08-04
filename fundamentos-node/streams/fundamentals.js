
import { Readable, Writable, Transform } from "node:stream";


class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        setTimeout(() => {

            const i = this.index++;

            if (i > 100) {
                this.push(null);
            } else {
                this.push(`${i} `);
            }

        }, 500);
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, _, callback) {
        console.log(Number(chunk.toString()) * 10);
        callback();
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, _, callback) {
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed);
        callback(null, Buffer.from(`${transformed}`));
    }
}





new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream());