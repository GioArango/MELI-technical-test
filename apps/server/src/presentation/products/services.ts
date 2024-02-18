import axios from "axios";
import { GenericResponse } from "../../models/GenericResponse";
import { IProduct } from "../../models/Product";

export class ProductService {

    /**
     * 
     * @param q 
     * @returns 
     */
    public getProductsByQuery = async (q: string): Promise<GenericResponse> => {
        try {
            const resp = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=4`)

            // mover lógica a otra capa

            let categories: string[] = [];

            if(resp.data?.filters && resp.data?.filters.length > 0) {
                categories = resp.data?.filters?.find((item: any) => item.id === 'category')
                    .values[0].path_from_root.map( (path: any) => path.name )
            }

            const currency = await this.getCurrencyInformation(resp.data.results[0].currency_id);

            const productsItems = [];

            const productInfo = (resp.data.results as IProduct[]).map((product) => {
                return {
                    id: product.id,
                    title: product.title,
                    price: {
                        currency: product.currency_id,
                        amount: `${currency.symbol} ${product.price}`,
                        decimals: currency.decimals
                    },
                    picture: product.thumbnail,
                    condition: product.condition === 'new' ? 'Nuevo' : 'Usado',
                    free_shipping: product.shipping.free_shipping,                    
                }
            })

            productsItems.push(...productInfo)

            let response = {
                categories,
                items: productsItems
            }
            
            const serviceResponse: GenericResponse = {
                isSuccessful: true,
                result: response
            }
            
            return serviceResponse
        } catch (error) {
            console.error(error)
            const serviceResponse: GenericResponse = {
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
    public getProductItemById = async (item: string): Promise<GenericResponse> => {
        try {
            const resp = await axios.get(`https://api.mercadolibre.com/items/${item}`)

            const productDescription = await this.getProductDescription(item);

            let productCategories;
            if (resp.data.category_id) {
                productCategories = await this.getCategories(resp.data.category_id)
            }

            const currency = await this.getCurrencyInformation(resp.data.currency_id)

            const producItem = {                
                item: {
                  id: resp.data.id,
                  title: resp.data.title,
                  price: {
                    currency: resp.data.currency_id,
                    amount: resp.data.price,
                    decimals: currency.decimals
                  },
                  picture: resp.data.pictures[0].url,
                  condition: resp.data.condition,
                  free_shipping: resp.data.shipping.free_shipping,
                  sold_quantity: 0,
                  description: productDescription,
                  categories: productCategories
                }
              }
    
            const serviceResponse: GenericResponse = {
                isSuccessful: true,
                result: producItem
            }

            return serviceResponse
        } catch (error) {
            console.error(error)
    
            const resp: GenericResponse = {
                isSuccessful: false,
                errorMessage: error as string
            }
            return resp
        }
    }

    /**
     * 
     * @param itemId 
     * @returns 
     */
    private getProductDescription = async (itemId: string): Promise<string> => {
        try {
            const description = await axios.get(`https://api.mercadolibre.com/items/${itemId}/description`)                
            return description.data.plain_text;
        } catch (error) {
            console.error(error);
            return '';
        }
    }

    /**
     * 
     * @param categoryId 
     * @returns 
     */
    private getCategories = async (categoryId: string ): Promise<string[]> => {
        try {
            const categoriesResponse = await axios.get(`https://api.mercadolibre.com/categories/${categoryId}`)

            const categories = categoriesResponse.data.path_from_root.map( (path: any) => path.name )

            return categories;
        } catch (error) {
            console.error(error)
            return [];
        }
    }

    private getCurrencyInformation = async(currencyId: string) => {
        try {
            const currencyInformation = await axios.get(`https://api.mercadolibre.com/currencies/${currencyId}`);
            const currency = {
                symbol: currencyInformation.data.symbol,
                decimals: currencyInformation.data.decimal_places
            }

            return currency;
        } catch (error) {
            console.error(error)
            const currency = {
                symbol: '$',
                decimals: 2
            }

            return currency;
        }
    } 
}
