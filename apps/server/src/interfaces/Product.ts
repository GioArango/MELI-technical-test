export interface IProductsList {
    site_id:                   string;
    country_default_time_zone: string;
    query:                     string;
    results:                   IProductResult[];
    filters:                   Filter[];
}

export interface AvailableFilterValue {
    id:      string;
    name:    string;
    results: number;
}

export interface Sort {
    id:   string;
    name: string;
}

export interface Filter {
    id:     string;
    name:   string;
    type:   string;
    values: FilterValue[];
}

export interface FilterValue {
    id:             string;
    name:           string;
    path_from_root: Sort[];
}

export interface ProductInfo {
    id:     string;
    score:  number;
    status: string;
}

export interface IProductResult {
    id:                  string;
    title:               string;
    condition:           string;
    thumbnail_id:        string;
    catalog_product_id:  string;
    listing_type_id:     string;
    permalink:           string;
    buying_mode:         string;
    site_id:             string;
    category_id:         string;
    domain_id:           string;
    thumbnail:           string;
    currency_id:         string;
    order_backend:       number;
    price:               number;
    original_price:      null;
    sale_price:          null;
    available_quantity:  number;
    official_store_id:   null;
    use_thumbnail_id:    boolean;
    accepts_mercadopago: boolean;
    shipping:            Shipping;
    stop_time:           Date;
    seller:              Seller;
    attributes:          Attribute[];
    installments:        Installments;
    winner_item_id:      null;
    catalog_listing:     boolean;
    discounts:           null;
    promotions:          any[];
    inventory_id:        null;
    location?:           Location;
}

export interface Attribute {
    id:                   string;
    name:                 string;
    value_id:             string;
    value_name:           string;
    attribute_group_id:   AttributeGroupID;
    attribute_group_name: AttributeGroupName;
    value_struct:         Struct | null;
    values:               AttributeValue[];
    source:               number;
    value_type:           ValueType;
}

export enum AttributeGroupID {
    Others = "OTHERS",
}

export enum AttributeGroupName {
    Otros = "Otros",
}

export interface Struct {
    number: number;
    unit:   string;
}

export interface AttributeValue {
    id:     string;
    name:   string;
    struct: Struct | null;
    source: number;
}

export interface Installments {
    quantity:    number;
    amount:      number;
    rate:        number;
    currency_id: string;
}

export interface Seller {
    id:       number;
    nickname: string;
}

export interface Shipping {
    store_pick_up: boolean;
    free_shipping: boolean;
    logistic_type: string;
    mode:          string;
    tags:          string[];
    benefits:      null;
    promise:       null;
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

export interface IProductListAdapterResponse {
    categories: string[];
    items: ProductAdapter[]
}

export interface ProductAdapter {
    id: string;
    title: string;
    currency: string;
    price: number;
    picture: string;
    condition: string;
    free_shipping: boolean;
}

export interface IProductItemAdapter {
    id: string;
    title: string;
    price: number;
    categoryId: string;
    currency: string;
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
}

// ******************

export interface IProductItem {
    id:                               string;
    site_id:                          string;
    title:                            string;
    seller_id:                        number;
    category_id:                      string;
    official_store_id:                null;
    price:                            number;
    base_price:                       number;
    original_price:                   number;
    currency_id:                      string;
    initial_quantity:                 number;
    buying_mode:                      string;
    listing_type_id:                  string;
    condition:                        string;
    permalink:                        string;
    thumbnail_id:                     string;
    thumbnail:                        string;
    pictures:                         Picture[];
    video_id:                         null;
    descriptions:                     any[];
    accepts_mercadopago:              boolean;
    non_mercado_pago_payment_methods: any[];
    shipping:                         ShippingItem;
    international_delivery_mode:      string;
    seller_address:                   SellerAddress;
    seller_contact:                   null;
    coverage_areas:                   any[];
    attributes:                       Attribute[];
    listing_source:                   string;
    variations:                       any[];
    status:                           string;
    sub_status:                       any[];
    tags:                             string[];
    warranty:                         string;
    catalog_product_id:               string;
    domain_id:                        string;
    parent_item_id:                   null;
    deal_ids:                         string[];
    automatic_relist:                 boolean;
    date_created:                     Date;
    last_updated:                     Date;
    health:                           null;
    catalog_listing:                  boolean;
}

export interface Struct {
    number: number;
    unit:   string;
}

export enum ValueType {
    Boolean = "boolean",
    List = "list",
    Number = "number",
    NumberUnit = "number_unit",
    String = "string",
}

export interface Value {
    id:     null | string;
    name:   string;
    struct: Struct | null;
}

export interface Location {
    address_line:    string;
    zip_code:        string;
    subneighborhood: null;
    city:            City;
    state:           City;
    country:         City;
    latitude:        number;
    longitude:       number;
}

export interface Picture {
    id:         string;
    url:        string;
    secure_url: string;
    size:       string;
    max_size:   string;
    quality:    string;
}

export interface SellerAddress {
    city:    City;
    state:   Country;
    country: Country;
    id:      number;
}

export interface City {
    id?: string;
    name: string;
}

export interface Country {
    id:   string;
    name: string;
}

export interface ShippingItem {
    mode:          string;
    methods:       any[];
    tags:          string[];
    dimensions:    null;
    local_pick_up: boolean;
    free_shipping: boolean;
    logistic_type: string;
    store_pick_up: boolean;
}


export interface IProductsListServiceResponse {
    categories?: string[];
    items:      Item[];
}

export interface Item {
    id:            string;
    title?:         string;
    currency?:      string;
    price:         Price;
    picture?:       string;
    condition?:     string;
    free_shipping?: boolean;
    category_Id?:  string;
    sold_quantity?:number;
    description?:  string;
    categories?:   string[];
}

export interface Price {
    currency?: string;
    amount?:   string;
    decimals?: number;
}

export interface IProductByIdServiceResponse {
    item: Item;
}
