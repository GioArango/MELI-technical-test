import { PATHS } from "@/constants";
import { IProductListItem } from "@/interfaces";
import { Link } from "react-router-dom";
import styles from '../../ProductList.module.scss';
import iconShipping from '@assets/icon_shipping.png'

interface Props {
    product: IProductListItem;
}

export const ProductItem = ({ product }: Props) => {

    return (
        <div className={styles['product-container']}>
            <Link to={`${PATHS.PRODUCTS}/${product.id}`}>
                <img src={product.picture} alt={product.title} className={styles['product-image']} />
            </Link>

            <div className={styles['product-detail-container']}>
                <div className={styles['product-price-container']}>
                    <p className={styles['product-price']}>{product.price.amount}</p>
                    {product.free_shipping && <img src={iconShipping} width={18} alt="Icono envío gratis"/>}
                </div>
                <p className={styles['product-title']}>{product.title}</p>
            </div>

            <div className={styles['product-location']}>
                <p>{"Ciudad"}</p>
            </div>
        </div>
    )
}
