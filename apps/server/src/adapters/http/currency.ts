import axios from 'axios';
import { ICurrency, ICurrencyAdapterResponse } from '../../interfaces/Currency';
import { config } from '../../config';

export class CurrencyAdapter {

    /**
     *
     */
    constructor() {}

    /**
     * Obtiene información sobre una moneda específica.
     * @param {string} currencyId - El ID de la moneda que se va a consultar.
     * @returns {Promise<ICurrencyAdapterResponse>} - Un objeto que contiene la información de la moneda, incluyendo el símbolo y la cantidad de decimales.
     * @throws {ICurrencyAdapterResponse} - Si ocurre un error al realizar la solicitud HTTP.
     */
    public getCurrencyInformation = async (currencyId: string): Promise<ICurrencyAdapterResponse> => {
        try {
            const apiUrl = config.API_URL
            const currencyInformation = await axios.get<ICurrency>(`${apiUrl}/currencies/${currencyId}`);
            
            const currency = {
                symbol: currencyInformation.data.symbol,
                decimals: currencyInformation.data.decimal_places
            }

            return currency;
        } catch (error) {
            console.error('CURRENCY',error)
            const currency = {
                symbol: '$',
                decimals: 2
            }

            return currency;
        }
    }
}