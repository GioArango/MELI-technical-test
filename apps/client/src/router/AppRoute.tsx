import { Layout } from "@/layout";
import { PATHS } from "@/constants";
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const ProductList = lazy(() => import("@/pages/ProductsList"));
const ProductItem = lazy(() => import("@/pages/ProductItem"));

export const AppRoute = createBrowserRouter([
    {
        path: PATHS.SEARCH,
        element: <Layout />,
        children: [
            {
                path: PATHS.PRODUCTS,
                element: (
                    <Suspense fallback={<span>Cargando...</span>}>
                        <ProductList />
                    </Suspense>
                )
            },
            {
                path: PATHS.PRODUCT_ITEM,
                element: (
                    <Suspense fallback={<span>Cargando...</span>}>
                        <ProductItem />
                    </Suspense>
                )
            }
        ]
    }
])