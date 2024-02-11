import express from 'express';
import path from 'path';

export class Server {

    private app = express();

    async start() {

        const staticPath = path.join(__dirname, '../../client/dist');

        console.log('OE',staticPath)
        // middlewares
        this.app.use(express.static(staticPath));

        this.app.listen(3000, () => {
            console.log(`Server running on port ${3000}`);
        })
    }

}