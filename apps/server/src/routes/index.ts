import { Router } from "express";
import { ProductRoutes } from "./product/routes";


export class AppRoutes {

    static get routes(): Router {
        const router = Router()

        router.use('/api/items', ProductRoutes.routes);

        return router;
    }
}