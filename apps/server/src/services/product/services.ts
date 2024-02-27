import { CategoryAdapter } from "../../adapters/http/category";
import { CurrencyAdapter } from "../../adapters/http/currency";
import { ProductAdapter } from "../../adapters/http/products";
import { GenericResponse } from "../../interfaces/GenericResponse";
import { IProductByIdServiceResponse, IProductItemAdapter, IProductListAdapterResponse, IProductsListServiceResponse, Item } from "../../interfaces/Product";
import { formatCurrency } from "../../utils/CurrencyFormatter";



export class ProductService {

    private readonly productAdapter: ProductAdapter;
    private readonly categoryAdapter: CategoryAdapter;
    private readonly currencyAdapter: CurrencyAdapter;

    constructor(productAdapter: ProductAdapter, categoryAdapter: CategoryAdapter, currencyAdapter: CurrencyAdapter) {
        this.productAdapter = productAdapter;
        this.categoryAdapter = categoryAdapter;
        this.currencyAdapter = currencyAdapter;
    }

    /**
     * 
     * @param q 
     * @returns 
     */
    public getProductsByQuery = async (q: string): Promise<GenericResponse<IProductsListServiceResponse>> => {
        try {
            const resp: GenericResponse<IProductListAdapterResponse> = await this.productAdapter.getProductsByQuery(q)

            if (!resp.isSuccessful) {
                throw new Error(resp.errorMessage)
            }

            const currency = await this.currencyAdapter.getCurrencyInformation(resp.result?.items[0].currency!);

            const productInfo = (resp.result?.items!).map((product: any) => {
                return {
                    ...product,
                    price: {
                        currency: product.currency,
                        amount:  formatCurrency(product.price, 0, product.currency),
                        decimals: currency.decimals
                    }
                }
            })


            let response = {
                categories: resp.result?.categories,
                items: productInfo
            }

            const serviceResponse: GenericResponse<IProductsListServiceResponse> = {
                isSuccessful: true,
                result: response
            }

            return serviceResponse
        } catch (error) {
            console.error(error)
            const serviceResponse = {
                isSuccessful: false,
                errorMessage: error as string
            }
            return serviceResponse
        }
    }

    /**
     * 
     * @param item 
     * @returns 
     */
    public getProductItemById = async (item: string): Promise<GenericResponse<IProductByIdServiceResponse>> => {
        try {
            const resp: GenericResponse<IProductItemAdapter> = await this.productAdapter.getProductItemById(item)
            
            if(!resp.isSuccessful || !resp.result) {
                throw new Error(resp.errorMessage)
            }

            const productDescription = await this.productAdapter.getProductDescription(item);

            let productCategories;

            if (resp.result?.categoryId) {
                productCategories = await this.categoryAdapter.getCategories(resp.result.categoryId)
            }

            const currency = await this.currencyAdapter.getCurrencyInformation(resp.result?.currency!)

            const productItem: Item = {
                ...resp.result,
                price: {
                    currency: resp.result?.currency,
                    amount: `${currency.symbol} ${formatCurrency(resp.result?.price, currency.decimals)}`,
                    decimals: currency.decimals
                },
                description: productDescription,
                categories: productCategories
            }

            const serviceResponse = {
                isSuccessful: true,
                result: {
                    item: productItem
                }
            }

            return serviceResponse
        } catch (error) {
            console.error(error)

            const resp = {
                isSuccessful: false,
                errorMessage: error as string
            }
            return resp
        }
    }
}
