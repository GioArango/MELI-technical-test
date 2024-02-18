import { Categories, GenericContainer, GenericLoader } from "@/components"
import { useAxiosFetch } from "@/hooks/useAxiosFetch"
import { IProductItem } from "@/interfaces"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import styles from './ProductDetail.module.scss'

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
              <section className={styles['product-body']} style={{ display: 'flex', padding: '0.5rem' }}>
                <div className={styles['product-image']}>
                  <img
                    src={product?.item?.picture}
                    alt={product?.item?.title}
                    className={styles['product-image']}
                  />
                </div>
                <div className={styles['product-resume']}>
                  <div>
                    <small>
                      {product?.item.condition === 'new' ? 'Nuevo' : 'Usado'}
                      <span>&nbsp;-&nbsp;</span>
                      {product?.item?.sold_quantity}
                      {' '}
                      vendidos
                    </small>
                  </div>
                  <p className={styles["product-title"]}>
                    <strong>{product?.item?.title}</strong>
                  </p>
                  <div style={{ display: 'flex' }}>
                    <h2 className={styles['product-price']}>
                      <span>{product?.item?.price.amount}</span>
                    </h2>
                    <small>
                      {product?.item?.price.amount.toFixed(2).split('.')[1]}
                    </small>
                  </div>
                  <button type="button" className={styles['button-buy']}>
                    Comprar
                  </button>
                </div>
              </section>
              <section className="product-description" style={{ marginTop: 40, padding: 10 }}>
                <p className="description__h3" style={{ fontSize: '1.6rem', marginBlock: 20 }}>Descripción del producto</p>
                <p className="description__p" style={{ fontSize: '1.rem', textAlign: 'justify' }}>
                  {product?.item.description ? product?.item.description : 'Descripción no disponible'}
                </p>
              </section>
            </GenericContainer>
          </>
      }
    </>
  )
}

export default ProductDetail