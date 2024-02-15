import { IAuthor, IPrice } from ".";

export interface IProduct {
    author:     IAuthor;
    categories: string[];
    items:      IProductItem[];
}

export interface IProductItem {
    id:            string;
    title:         string;
    price:         IPrice;
    picture:       string;
    condition:     string;
    free_shipping: boolean;
}

