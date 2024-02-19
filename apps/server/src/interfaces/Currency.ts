export interface ICurrency {
    id:            string;
    symbol:        string;
    description:   string;
    decimalPlaces: number;
}

export interface ICurrencyAdapterResponse {
    symbol:        string;
    decimals: number;
}