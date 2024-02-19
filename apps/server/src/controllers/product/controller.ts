import { Request, Response } from "express";
import { ProductService } from "../../services/product/services";
import { GenericResponse } from "../../interfaces/GenericResponse";
import { IProductsListServiceResponse, IProductByIdServiceResponse } from '../../interfaces/Product';

export class ProductController {

    private readonly productServices: ProductService;

    constructor(productService: ProductService) {
        this.productServices = productService
    }

    public getProducts = async (req: Request, res: Response) => {
        try {
            const product = req.query.q;

            if(!product || product === '' || (product as string).length > 100) {
                return res.status(400).json({
                    isSuccess: false,
                    message: 'Invalid data'
                })
            }

            const getProductsServiceResponse: GenericResponse<IProductsListServiceResponse> = await this.productServices.getProductsByQuery(product as string)

            if (!getProductsServiceResponse.isSuccessful) {
                throw new Error(getProductsServiceResponse.errorMessage)
            }

            const response = {
                author: res.locals.author,
                categories: getProductsServiceResponse.result?.categories,
                items: getProductsServiceResponse.result?.items
            }

            res.status(200).json(response)

        } catch (error) {
            console.error(error)
            res.status(500).json({
                isSuccess: false,
                message: 'Server error'
            })
        }
    }

    public getProductItem = async (req: Request, res: Response) => {
        try {
            const idProduct = req.params.id;

            if (!idProduct || idProduct === ''){
                return res.status(400).json({
                    isSuccess: false,
                    message: 'Invalid data'
                })
            }

            const productItemServiceResponse: GenericResponse<IProductByIdServiceResponse> = await this.productServices.getProductItemById(idProduct)

            if (!productItemServiceResponse.isSuccessful) {
                throw new Error(productItemServiceResponse.errorMessage);
            }

            const response = {
                author: res.locals.author,
                item: productItemServiceResponse.result?.item
            }

            res.status(200).json(response)

        } catch (error) {
            console.error(error)
            return res.status(500).json({
                isSuccess: false,
                message: error
            })
        }
    }
}