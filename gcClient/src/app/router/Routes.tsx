import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import CatalogPage from "../../features/catalog/CatalogPage";
import ProductDetails from "../../features/catalog/productDetails/ProductDetails";
import NotFound from "../layout/NoFound";
import BasketPage from "../../features/basket/BasketPage";
import Login from "../../features/account/login";
import Register from "../../features/account/register";
import RequireAut from "./RequireAuth";
import Profile from "../../features/account/profile";
import Sign from "../../features/account/sign";
import ServerError from "../../features/error/server-error";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAut />, children: [
                {path: '/profile', element: <Profile />},
                {path: '/basket', element: <BasketPage/>},
            ]},
            {path: '/server-error', element: <ServerError />},
            {path: '/jewelry/rings', element: <CatalogPage productType="Rings"/>},
            {path: '/jewelry/braceletes', element: <CatalogPage productType="Braceletes"/>},
            {path: '/jewelry/rings/:id', element: <ProductDetails />},
            {path: '/jewelry/braceletes/:id', element: <ProductDetails/>},
            {element: <Sign />, children: [
                {path: '/login', element: <Login/>},
                {path: '/Register', element: <Register/>}
            ]},
            {path: '*', element: <NotFound/>},
        ]
    }
])