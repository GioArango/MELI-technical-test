import { Layout } from "@/layout";
import { PATHS } from "@/constants";
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { GenericLoader } from "@/components";

const ProductList = lazy(() => import("@/pages/ProductsList"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));

export const AppRoute = createBrowserRouter([
    {
        path: PATHS.SEARCH,
        element: <Layout />,
        children: [
            {
                path: PATHS.PRODUCTS,
                element: (
                    <Suspense fallback={<GenericLoader />}>
                        <ProductList />
                    </Suspense>
                )
            },
            {
                path: PATHS.PRODUCT_ITEM,
                element: (
                    <Suspense fallback={<GenericLoader />}>
                        <ProductDetail />
                    </Suspense>
                )
            }
        ]
    }
])