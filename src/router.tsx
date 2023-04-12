/* eslint-disable react/react-in-jsx-scope */

import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import PlaylistPage from "./components/PlaylistPage/PlaylistPage";
import LikedSongsPage from "./components/LikedSongsPage/LikedSongsPage";
import MainPageWrapper from "./components/MainPageWrapper/MainPageWrapper";
import DefaultSearchPage from "./components/DefaultSearchPage/DefaultSearchPage";
import SearchResultsLayout from "./components/SearchResultsPage/SearchResultsLayout";
import SuccessFullLoginPage from "./components/SuccessFullLoginPage";
import AllSearchResultsPage from "./components/SearchResultsPage/AllSearchResultsPage/AllSearchResultsPage";
import SongsSearchResultsPage from "./components/SearchResultsPage/CertainSearchResultsPage";

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
                element: <SearchResultsLayout />,
                children: [
                    {
                        caseSensitive: false,
                        path: "/search/:query",
                        element: <AllSearchResultsPage />
                    },
                    {
                        caseSensitive: false,
                        path: "/search/:query/:type",
                        element: <SongsSearchResultsPage />
                    }
                ]
            },
            {
                caseSensitive: false,
                path: "/collection/tracks",
                element: <LikedSongsPage />
            }
        ]
    }
]);
