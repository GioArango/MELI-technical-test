import { Categories, GenericContainer, GenericLoader } from "@/components";
import { useAxiosFetch } from "@/hooks/useAxiosFetch";
import { IProductsList } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { ProductItem } from "./components";

const ProductList = () => {

  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get('search');

  const [products, setProducts] = useState<IProductsList>()

  const [data, error, loading, fetchData] = useAxiosFetch<IProductsList>({
    method: 'GET',
    url: `/items?q=${queryParamValue}`
  });

  useEffect(() => {
    if (data) {
      setProducts(data)
    }
  }, [data])

  useEffect(() => {
    if (queryParamValue) {
      fetchData();
    }
  }, [queryParamValue]);

  return (
    <>
      <Helmet>
        <title>Lista de productos | {queryParamValue}</title>
      </Helmet>
      <Categories categories={products?.categories} />
      {
        loading
          ? (
            <GenericLoader />
          )
          :
          <GenericContainer>
            {
              products && products.items && products.items.length > 0 ? (
                <>
                  {products.items.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <ProductItem product={item} />
                      {index !== products.items.length - 1 && <hr className='divider' />}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <React.Fragment>
                  {
                    (error) ?
                      <span>Ha ocurrido un error</span>
                      :
                      <span>No hay productos</span>
                  }
                </React.Fragment>
              )
            }
          </GenericContainer>
      }
    </>
  );

}

export default ProductList