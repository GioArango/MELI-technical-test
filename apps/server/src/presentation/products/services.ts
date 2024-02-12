import axios from "axios";
import { GenericResponse } from "../../models/GenericResponse";

export const getProductsByQuery = async (q: string): Promise<GenericResponse> => {
    try {
        const resp = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=4`)
        console.log(resp)
        return resp.data.results
    } catch (error) {
        console.error(error)
        const resp: GenericResponse = {
            isSuccessful: false,
            errorMessage: error as string
        }
        return resp
    }
}

export const getProductItemById = async (item: string): Promise<GenericResponse> => {
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

export const getCategoriesByProductId = async(productId: string): Promise<GenericResponse> => {
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