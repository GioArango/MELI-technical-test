import { IAuthor, IPrice } from ".";

export interface IProductsList {
    author:     IAuthor;
    categories: string[];
    items:      IProductListItem[];
}

export interface IProductListItem {
    id:            string;
    title:         string;
    price:         IPrice;
    picture:       string;
    condition:     string;
    free_shipping: boolean;
    location:      string;
}

export interface IProduct  {
    id:           string;
    title:        string;
    price:        IPrice;
    picture:      string;
    condition:    string;
    freeShipping: boolean;
    sold_quantity: number;
    description:  string;
    categories: string[];
}

export interface IProductItem {
    item: IProduct
}
