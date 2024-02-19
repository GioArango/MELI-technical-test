import { Router } from "express";
import { ProductAdapter } from "../../adapters/http/products";
import { CurrencyAdapter } from "../../adapters/http/currency";
import { CategoryAdapter } from "../../adapters/http/category";
import { ProductService } from "../../services/product/services";
import { ProductController } from "../../controllers/product/controller";
import { authorMiddleware } from "../../middlewares/AuthorMiddleware";


export class ProductRoutes {

    static get routes(): Router {
        const router = Router()

        const productAdapter = new ProductAdapter();
        const categoryAdapter = new CategoryAdapter();
        const currencyAdapter = new CurrencyAdapter();

        const productServices = new ProductService(productAdapter, categoryAdapter, currencyAdapter);
        const productController = new ProductController(productServices);

        router.get('/', authorMiddleware, productController.getProducts)
        router.get('/:id', authorMiddleware, productController.getProductItem)

        return router;
    }
}