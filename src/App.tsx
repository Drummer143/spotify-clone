import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./router";
import { getCurrentUser } from "./redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { getCurrentUserPlaylist } from "./spotifyApiWrapper/playlists/getCurrentUserPlaylists";
// import axios from "axios";
// import { spotifyApiHeaders } from "./utils/constants";

const App: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(getCurrentUser());

            getCurrentUserPlaylist(accessToken)
                .catch(error => console.error(error.response.data.error));

            // axios.get("https://api.spotify.com/v1/recommendations", { headers: spotifyApiHeaders(accessToken) })
                // .then(res => console.log(res.data))
                // .catch(error => console.error(error.response.data.error));
        }
    }, [accessToken]);

    return (
        <RouterProvider router={router} />
    );
};

export default App;
