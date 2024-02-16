import { Request, Response } from "express";
import { ProductService } from './services';
import { IProduct } from '../../models/Product';

export class ProductController {

    private readonly productServices: ProductService;

    constructor(productService: ProductService) {
        this.productServices = productService
    }

    public getProducts = async (req: Request, res: Response) => {
        try {
            const product = req.query.q;
            const getProductsServiceResponse = await this.productServices.getProductsByQuery(product as string)

            if (!getProductsServiceResponse.isSuccessful) {
                throw new Error(getProductsServiceResponse.errorMessage)
            }

            res.status(200).json(getProductsServiceResponse.result)

        } catch (error) {
            console.error(error)
            res.status(500).json({
                isSuccess: false,
                message: 'Error en el servidor'
            })
        }
    }

    public getProductItem = async (req: Request, res: Response) => {
        try {
            const idProduct = req.params.id;
            console.log(idProduct)
            const productItemServiceResponse = await this.productServices.getProductItemById(idProduct)

            if (!productItemServiceResponse.isSuccessful) {
                throw new Error(productItemServiceResponse.errorMessage);
            }

            return res.status(200).json(productItemServiceResponse.result)

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                isSuccess: false,
                message: error
            })
        }
    }
}