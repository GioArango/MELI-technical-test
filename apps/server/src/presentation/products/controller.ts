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
            
            // lógica que se moverá a otra capa    
            
            if(!getProductsServiceResponse.isSuccessful) {
                throw new Error(getProductsServiceResponse.errorMessage)
            }

            const productsItems = [];

            const productInfo = (getProductsServiceResponse.result as IProduct[]).map((product) => {
                return {
                    id: product.id,
                    title: product.title,
                    price: {
                        currency: product.currency_id,
                        amount: product.price,
                        decimals: 0 // https://api.mercadolibre.com/sites/MLA/currencies/${curency_id} -->
                    },
                    picture: product.thumbnail,
                    condition: product.attributes?.find(attribute => attribute.id === 'ITEM_CONDITION')?.value_name,
                    free_shipping: product.shipping.free_shipping
                }
            })

            console.log(productInfo)

            productsItems.push(...productInfo)

            let response = {
                items: productsItems
            }
    
            res.status(200).json(response)
            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                isSuccess: false,
                message: 'Error en el servidor'
            })
        }
    }
}