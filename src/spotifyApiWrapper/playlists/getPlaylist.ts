import axios from "axios";

import { spotifyApiHeaders } from "src/utils/constants";

const DEFAULT_URL = "https://api.spotify.com/v1/playlists";

export const getCurrentUserPlaylist = async (accessToken: string, id: string) => {
    const response = await axios.get(`${DEFAULT_URL}/${id}`, {
        headers: spotifyApiHeaders(accessToken)
    });

    return response.data;
};
