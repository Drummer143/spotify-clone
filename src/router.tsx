/* eslint-disable react/react-in-jsx-scope */

import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import MainPageWrapper from "./components/MainPageWrapper/MainPageWrapper";
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
                element: <MainPageWrapper />
            }
        ]
    }
]);
