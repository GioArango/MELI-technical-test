import { PATHS } from "@/constants";
import { useAxiosFetch } from "@/hooks/useAxiosFetch";
import { IProduct } from "@/interfaces";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

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
        <>
          {
            products?.items.map((item, index) => (
              <>
                <div style={{ display: 'flex', flexDirection: 'row', width: '80vw', justifyContent: 'center', gap: 1, padding: 2 }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                    <Link to={`${PATHS.PRODUCTS}/${item.id}`}>
                      <img src={item.picture} alt={item.title} style={{ marginInline: 30 }}/>
                    </Link>
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex' }}>
                      <p style={{ marginRight: 20 }}>{item.price.amount}</p> 
                      <p>{item.free_shipping && 'envio gratis'}</p>
                    </div>
                    <span>{item.title}</span>
                  </div>

                  <div style={{ flexGrow: 1, textAlign: 'end', margin: 10 }}>
                    <p>{"Ciudad"}</p>
                  </div>
                </div>
                {
                  (index + 1) !== products.items.length &&
                  <hr style={{ marginInline: 10, backgroundColor: 'red' }}/>
                }
              </>
            ))
          }
        </>
      }
    </>
  )
}

export default ProductList