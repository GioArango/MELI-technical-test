import { Categories, GenericContainer, GenericLoader } from "@/components"
import { useAxiosFetch } from "@/hooks/useAxiosFetch"
import { IProductItem } from "@/interfaces"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import styles from './ProductDetail.module.scss'

const ProductDetail = () => {

  const [product, setProduct] = useState<IProductItem>()
  const { id: productId } = useParams()

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
              {
                product ?
                  <React.Fragment>
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
                            {`${product?.item?.sold_quantity} vendidos`}
                          </small>
                        </div>
                        <p className={styles["product-title"]}>
                          <strong>{product?.item?.title}</strong>
                        </p>
                        <div style={{ display: 'flex' }}>
                          <h2 className={styles['product-price']}>
                            <span>{product?.item?.price.amount.toString().split(',')[0]}</span>
                          </h2>
                          <small>
                            {product?.item?.price.amount.toString().split(',')[1]}
                          </small>
                        </div>
                        <button type="button" className={styles['button-buy']}>
                          Comprar
                        </button>
                      </div>
                    </section>
                    <section className={styles['description-container']}>
                      <p className={styles['description']}>Descripción del producto</p>
                      <p className={styles['content']}>
                        {product?.item.description ? product?.item.description : 'Descripción no disponible'}
                      </p>
                    </section>
                  </React.Fragment>
                  : (
                    <React.Fragment>
                      {
                        (error) ?
                          <span>Ha ocurrido un error</span>
                          :
                          <span>No existe el detalle del producto</span>
                      }
                    </React.Fragment>
                  )
              }
            </GenericContainer>
          </>
      }
    </>
  )
}

export default ProductDetail