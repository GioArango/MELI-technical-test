import { PATHS } from "@/constants";
import { IProductListItem } from "@/interfaces";
import { Link } from "react-router-dom";
import styles from '../../ProductList.module.scss';

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
                    <p>{product.free_shipping && 'envio gratis'}</p>
                </div>
                <p className={styles['product-title']}>{product.title}</p>
            </div>

            <div className={styles['product-location']}>
                <p>{"Ciudad"}</p>
            </div>
        </div>
    )
}
