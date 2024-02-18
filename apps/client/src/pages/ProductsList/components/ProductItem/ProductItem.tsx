import { PATHS } from "@/constants";
import { IProductListItem } from "@/interfaces";
import { Link } from "react-router-dom";

interface Props {
    product: IProductListItem;
}

export const ProductItem = ({ product }: Props) => {
    
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '80vw', justifyContent: 'center', gap: 1, padding: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                <Link to={`${PATHS.PRODUCTS}/${product.id}`}>
                    <img src={product.picture} alt={product.title} style={{ marginInline: 30 }} width={100} />
                </Link>
            </div>

            <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex' }}>
                    <p style={{ marginRight: 20 }}>{product.price.amount}</p>
                    <p>{product.free_shipping && 'envio gratis'}</p>
                </div>
                <span>{product.title}</span>
            </div>

            <div style={{ flexGrow: 1, textAlign: 'end', margin: 10 }}>
                <p>{"Ciudad"}</p>
            </div>
        </div>
    )
}
