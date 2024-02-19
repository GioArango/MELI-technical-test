export interface ICurrency {
    id:            string;
    symbol:        string;
    description:   string;
    decimal_places: number;
}

export interface ICurrencyAdapterResponse {
    symbol:        string;
    decimals: number;
}