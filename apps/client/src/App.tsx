// import React from 'react'
import { useState } from 'react';
import './App.css';
export interface IProduct {
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
  original_price:      number;
  sale_price:          null;
  available_quantity:  number;
  official_store_id:   number;
  official_store_name: string;
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
  promotions:          string[];
  inventory_id:        null;
}

export interface Attribute {
  id:                   string;
  name:                 string;
  value_id:             string;
  value_name:           string;
  attribute_group_id:   string;
  attribute_group_name: string;
  value_struct:         Struct | null;
  values:               Value[];
  source:               number;
  value_type:           string;
}

export interface Struct {
  number: number;
  unit:   string;
}

export interface Value {
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


function App() {
  const [products, setProducts] = useState<IProduct[]>([])

  const handleServer = async() => {
    fetch('/home')
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setProducts(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }
  
  // useEffect(() => {
  //   fetch('/home')
  //     .then(resp => resp.json())
  //     .then(data => {
  //       console.log(data)
  //       setProducts(data);
  //     })
  //     .catch(error => {
  //       console.error('Error al obtener los datos:', error);
  //     });
  // }, [])

  return (
    <>
      <h1>Productos:</h1>
      <button onClick={handleServer}>Consumir server</button>

      <ul>
        {
          products.map(p => (
            <li>{p.title}</li>
          ))
        }
      </ul>
    </>
  )
}

export default App
