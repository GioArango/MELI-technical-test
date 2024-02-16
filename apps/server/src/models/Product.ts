export interface IProduct {
    id: string;
    title: string;
    condition: string;
    thumbnail_id: string;
    catalog_product_id: string;
    listing_type_id: string;
    permalink: string;
    buying_mode: string;
    site_id: string;
    category_id: string;
    domain_id: string;
    thumbnail: string;
    currency_id: string;
    order_backend: number;
    price: number;
    original_price: number | null;
    sale_price: null;
    available_quantity: number;
    official_store_id: null;
    use_thumbnail_id: boolean;
    accepts_mercadopago: boolean;
    shipping: Shipping;
    stop_time: Date;
    seller: Seller;
    attributes: Attribute[];
    installments: Installments;
    winner_item_id: null;
    catalog_listing: boolean;
    discounts: null;
    promotions: any[];
    inventory_id: string;
    differential_pricing?: DifferentialPricing;
}

export interface Attribute {
    id: string;
    name: string;
    value_id: null | string;
    value_name: string;
    attribute_group_id: AttributeGroupID;
    attribute_group_name: AttributeGroupName;
    value_struct: Struct | null;
    values: Value[];
    source: number;
    value_type: ValueType;
}

export enum AttributeGroupID {
    Others = "OTHERS",
}

export enum AttributeGroupName {
    Otros = "Otros",
}

export interface Struct {
    number: number;
    unit: Unit;
}

export enum Unit {
    CM = "cm",
    G = "g",
    Kg = "kg",
    Mm = "mm",
}

export enum ValueType {
    List = "list",
    NumberUnit = "number_unit",
    String = "string",
}

export interface Value {
    id: null | string;
    name: string;
    struct: Struct | null;
    source: number;
}

export interface DifferentialPricing {
    id: number;
}

export interface Installments {
    quantity: number;
    amount: number;
    rate: number;
    currency_id: string;
}

export interface Seller {
    id: number;
    nickname: string;
}

export interface Shipping {
    store_pick_up: boolean;
    free_shipping: boolean;
    logistic_type: string;
    mode: string;
    tags: string[];
    benefits: null;
    promise: null;
}


export interface ProductItem {
    id: string;
    title: string;
    price: {
        currency: string;
        amount: number;
        decimals: number;
    },
    picture: string;
    condition: string;
    free_shipping: false,
    sold_quantity: number;
    description: string;
}