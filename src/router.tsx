/* eslint-disable react/react-in-jsx-scope */

import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import PlaylistPage from "./components/PlaylistPage/PlaylistPage";
import MainPageWrapper from "./components/MainPageWrapper/MainPageWrapper";
import SearchResultsPage from "./components/SearchResultsPage/SearchResultsPage";
import DefaultSearchPage from "./components/DefaultSearchPage/DefaultSearchPage";
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
            },
            {
                caseSensitive: false,
                path: "/playlist/:id",
                element: <PlaylistPage />
            },
            {
                caseSensitive: false,
                path: "/search",
                element: <DefaultSearchPage />
            },
            {
                caseSensitive: false,
                path: "/search/:query",
                element: <SearchResultsPage />
            },
            {
                caseSensitive: false,
                path: "/search/:query/:filter",
                element: <SearchResultsPage />
            }
        ]
    }
]);
