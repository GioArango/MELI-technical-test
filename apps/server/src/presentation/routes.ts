import { Router } from "express";
import { ProductController } from "./products/controller";
import { ProductRoutes } from "./products/routes";


export class AppRoutes {

    static get routes(): Router {
        const router = Router()

        router.use('/api/items', ProductRoutes.routes);

        return router;
    }
}