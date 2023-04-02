/* eslint-disable react/react-in-jsx-scope */

import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import SuccessFullLoginPage from "./components/SuccessFullLoginPage";

export default createBrowserRouter([
    {
        path: "/successful-login",
        element: <SuccessFullLoginPage />
    },
    {
        caseSensitive: false,
        path: "/",
        element: <Layout />,
        children: [
            {
                caseSensitive: false,
                path: "/",
                element: <MainPage />
            }
        ]
    }
]);
