import { Layout } from "@/layout";
import { PATHS } from "@/constants";
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { GenericLoader } from "@/components";

const ProductList = lazy(() => import("@/pages/ProductsList"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Error = lazy(() => import("@/pages/Error"));

export const AppRoute = createBrowserRouter([
    {
        path: PATHS.NOT_FOUND,
        element:<NotFound />
    },
    {
        path: PATHS.SEARCH,
        element: <Layout />,
        errorElement: <Error />,
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