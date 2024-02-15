import { useAxiosFetch } from "@/hooks/useAxiosFetch";
import { IProduct } from "@/interfaces";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {

  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get('search');

  const [products, setProducts] = useState<IProduct>()

  const [data, error, loading, fetchData] = useAxiosFetch<IProduct>({
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
      {loading && <span>cargando</span>}

      {
        (products && products?.items?.length > 0 && !loading) &&
        <ul>
          {
            products?.items.map( item => (
              <li>{item.title}</li>
            ))
          }
        </ul>
      }
    </>
  )
}

export default ProductList