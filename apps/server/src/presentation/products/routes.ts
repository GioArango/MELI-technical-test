import { Router } from "express";
import { ProductController } from "./controller";


export class ProductRoutes {

    static get routes(): Router {
        const router = Router()
        const productController = new ProductController();

        router.use('/', productController.getProducts)

        return router;
    }
}