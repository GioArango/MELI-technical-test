import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "./services";


export class ProductRoutes {

    static get routes(): Router {
        const router = Router()
        const productServices = new ProductService();
        const productController = new ProductController(productServices);

        router.use('/', productController.getProducts)

        return router;
    }
}