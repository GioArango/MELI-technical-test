import axios from "axios";
import { GenericResponse } from "../../models/GenericResponse";

export class ProductService {

    public getProductsByQuery = async (q: string): Promise<GenericResponse> => {
        try {
            const resp = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=4`)
            
            const serviceResponse: GenericResponse = {
                isSuccessful: true,
                result: resp.data.results
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
    
            return resp.data
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
