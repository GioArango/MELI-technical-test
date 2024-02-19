import axios from 'axios';
import { config } from '../../config';
export class CategoryAdapter {

    /**
     *
     */
    constructor() { }

    /**
     * Obtiene las categorías relacionadas con una categoría específica.
     * @param {string} categoryId - El ID de la categoría para la cual se desea obtener las categorías relacionadas.
     * @returns {Promise<string[]>} - Una promesa que se resuelve con un array de strings que representan los nombres de las categorías relacionadas.
     * @throws - Retorna un arreglo vacío si ocurre un error al realizar la solicitud HTTP.
     */
    public getCategories = async (categoryId: string): Promise<string[]> => {
        try {
            const apiUrl = config.API_URL
            const categoriesResponse = await axios.get(`${apiUrl}/categories/${categoryId}`)

            const categories = categoriesResponse.data.path_from_root.map((path: any) => path.name)

            return categories;
        } catch (error) {
            console.error('CATEGORY', error)
            return [];
        }
    }
}