import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        setTimeout(() => {

            const i = this.index++;

            if (i > 100) {
                this.push(null);
            } else {
                this.push(`${i}`);
            }

        }, 500);
    }
}

fetch('http://localhost:3000', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
})