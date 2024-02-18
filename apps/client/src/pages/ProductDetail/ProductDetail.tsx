import { Categories, GenericContainer, GenericLoader } from "@/components"
import { useAxiosFetch } from "@/hooks/useAxiosFetch"
import { IProductItem } from "@/interfaces"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"

const ProductDetail = () => {

  const [product, setProduct] = useState<IProductItem>()
  const { id: productId } = useParams()

  console.log(productId)


  const [data, error, loading, fetchData] = useAxiosFetch<IProductItem>({
    method: 'GET',
    url: `items/${productId}`
  })

  useEffect(() => {
    if (data) {
      setProduct(data)
    }
  }, [data])

  useEffect(() => {
    if (productId) {
      fetchData();
    }
  }, [productId])

  return (
    <>
      <Helmet>
        <title>{product?.item ? `Producto | ${product?.item.title}` : 'Cargando...'}</title>
      </Helmet>
      {
        loading
          ? (<GenericLoader />)
          :
          <>
            <Categories categories={product?.item.categories} />
            <GenericContainer>
              <div className="body-content">
                <section className="product-body" style={{ display: 'flex' }}>
                  <div className="product-image">
                    <img
                      src={product?.item?.picture}
                      alt={product?.item?.title}
                      style={{ marginInline: 120 }}
                    />
                  </div>
                  <div className="product-resume" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div>
                      <small className="product-usage">
                        {product?.item.condition === 'new' ? 'Nuevo' : 'Usado'}
                        <span>&nbsp;-&nbsp;</span>
                        {product?.item?.sold_quantity}
                        {' '}
                        vendidos
                      </small>
                    </div>
                    <p className="product-title">
                      {product?.item?.title}
                    </p>
                    <h2 className="product-resume__h2">
                      <span>{product?.item?.price.amount}</span>
                      <span className="meli-supra">
                        {product?.item?.price.decimals}
                      </span>
                    </h2>
                    <button type="button" className="product-resume__button">
                      Comprar
                    </button>
                  </div>
                </section>
              </div>
              <div>
                <div className="product-description">
                  <h3 className="description__h3">Descripción del producto</h3>
                  <p className="description__p">
                    {product?.item.description}
                  </p>
                </div>
              </div>
            </GenericContainer>
          </>
      }
    </>
  )
}

export default ProductDetail