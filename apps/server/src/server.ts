import express, { Router } from 'express';
import path, { dirname } from 'path';
import cors from 'cors';
import { authorMiddleware } from './middlewares/AuthorMiddleware';

interface Options {
    port: number;
    routes: Router;
    public_path?: string
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes, public_path = 'dist' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;        
    }

    async start() {

        const staticPath = path.join(__dirname, `../../../${this.publicPath}`);

        // middlewares
        this.app.use(express.static(staticPath));
        this.app.use(cors())
        this.app.use(authorMiddleware);

        // routes
        this.app.use( this.routes )                

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }

}