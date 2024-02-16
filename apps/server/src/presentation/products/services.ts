import axios from "axios";
import { GenericResponse } from "../../models/GenericResponse";
import { IProduct } from "../../models/Product";

export class ProductService {

    public getProductsByQuery = async (q: string): Promise<GenericResponse> => {
        try {
            const resp = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=4`)

            // mover lógica a otra capa

            const productsItems = [];

            const productInfo = (resp.data.results as IProduct[]).map((product) => {
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

            productsItems.push(...productInfo)

            let response = {
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
    
    public getProductItemById = async (item: string): Promise<GenericResponse> => {
        try {
            const resp = await axios.get(`https://api.mercadolibre.com/items/${item}`)
            console.log(resp.data)

            const producItem = {                
                item: {
                  id: resp.data.id,
                  title: resp.data.title,
                  price: {
                    currency: resp.data.currency_id,
                    amount: resp.data.price,
                    decimals: 0 //por definir
                  },
                  picture: resp.data.pictures[0].url,
                  condition: resp.data.condition,
                  free_shipping: resp.data.shipping.free_shipping,
                  sold_quantity: 0,
                  description: "DESCIPTION"
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
    
    public getCategoriesByProductId = async(productId: string): Promise<GenericResponse> => {
        try {
            const resp = await axios.get(`https://api.mercadolibre.com/categories/${productId}`)
    
            return resp.data;
        } catch (error) {
            console.error(error)
    
            const resp: GenericResponse = {
                isSuccessful: false,
                errorMessage: error as string
            }
            return resp
        }
    }
}
