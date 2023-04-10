import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./router";
import { useAppSelector } from "./hooks";

const App: React.FC = () => {
    const title = useAppSelector(state => state.app.title);

    useEffect(() => {
        document.title = title;
    }, [title]);

    return <RouterProvider router={router} />;
};

export default App;
