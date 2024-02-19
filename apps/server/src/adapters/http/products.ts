import axios from "axios";
import { IProductItem, IProductItemAdapter, IProductListAdapterResponse, IProductResult, IProductsList } from "../../interfaces/Product";

import { config } from "../../config";
import { GenericResponse } from "../../interfaces/GenericResponse";

export class ProductAdapter {

    /**
     *
     */
    constructor() { }

    /**
     * Obtiene productos basados en una consulta de búsqueda.
     * @param {string} q - La consulta de búsqueda utilizada para recuperar productos.
     * @returns {Promise<GenericResponse>} - Una promesa que se resuelve con un objeto que contiene la información de los productos y las categorías relacionadas.
     * @throws - Si ocurre un error al realizar la solicitud HTTP.
     */
    public getProductsByQuery = async (q: string): Promise<GenericResponse<IProductListAdapterResponse>> => {
        try {
            const apiUrl = config.API_URL;
            const recordLimit = config.RECORD_LIMIT;
            const resp = await axios.get<IProductsList>(`${apiUrl}/sites/MLA/search?q=${q}&limit=${recordLimit}`)

            let categories: string[] = [];

            if (resp.data?.filters && resp.data?.filters.length > 0) {
                const categoryFilter = resp.data?.filters?.find((item: any) => item.id === 'category');
                categories = categoryFilter?.values[0]?.path_from_root.map((path: any) => path.name) || [];
            }

            const productsItems = [];

            const productInfo = (resp.data.results as IProductResult[]).map((product) => {
                return {
                    id: product.id,
                    title: product.title,
                    currency: product.currency_id,
                    price: product.price,
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

            const serviceResponse: GenericResponse<IProductListAdapterResponse> = {
                isSuccessful: true,
                result: response
            }

            return serviceResponse
        } catch (error) {
            console.error('BY QUERY',error)
            const serviceResponse = {
                isSuccessful: false,
                errorMessage: error as string
            }
            return serviceResponse
        }
    }

    /**
     * Obtiene información de un producto basado en su identificador.
     * @param {string} item - El identificador del producto que se desea obtener.
     * @returns {Promise<GenericResponse<IProductItemAdapter | string>>} - Una promesa que se resuelve con un objeto que contiene la información del producto o un mensaje de error en caso de fallar la solicitud.
     * @throws - Si ocurre un error al realizar la solicitud HTTP.
     */
    public getProductItemById = async (item: string): Promise<GenericResponse<IProductItemAdapter>> => {
        try {
            const resp = await axios.get<IProductItem>(`https://api.mercadolibre.com/items/${item}`)

            const productItem = {
                id: resp.data.id,
                title: resp.data.title,
                price: resp.data.price,
                categoryId: resp.data.category_id,
                currency: resp.data.currency_id,
                picture: resp.data.pictures[0].url,
                condition: resp.data.condition,
                free_shipping: resp.data.shipping.free_shipping,
                sold_quantity: 0
            }

            const serviceResponse: GenericResponse<IProductItemAdapter> = {
                isSuccessful: true,
                result: productItem
            }

            return serviceResponse
        } catch (error) {
            console.error('BY ID',error)

            const resp = {
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
    public getProductDescription = async (itemId: string): Promise<string> => {
        try {
            const description = await axios.get(`https://api.mercadolibre.com/items/${itemId}/description`)
            return description.data.plain_text;
        } catch (error) {
            console.error('DESCRIPTION',error);
            return '';
        }
    }

}
