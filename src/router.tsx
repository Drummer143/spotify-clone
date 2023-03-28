/* eslint-disable react/react-in-jsx-scope */

import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import MainPage from "./components/MainPage";

export default createBrowserRouter([
    {
        caseSensitive: false,
        path: "/",
        element: <App />,
        children: [
            {
                caseSensitive: false,
                path: "/",
                element: <MainPage />
            }
        ]
    }
]);
