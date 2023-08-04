
import { Readable } from "node:stream";


class OneToHundredStram extends Readable {
    index = 1;
    
    _read(){        
        setTimeout(()=>{

            const i = this.index++;

            if(i > 100){
                this.push(null);
            } else {
                this.push(`${i} `);
            }

        }, 500);
    }
}


new OneToHundredStram().pipe(process.stdout);