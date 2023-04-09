import axios from "axios";

import { spotifyApiHeaders } from "../../utils";

const DEFAULT_URL = "https://api.spotify.com/v1/playlists";

export const getPlaylist = async (accessToken: string, id: string): Promise<GetPlayListResponse> => {
    const response = await axios.get(`${DEFAULT_URL}/${id}`, {
        headers: spotifyApiHeaders(accessToken)
    });

    return response.data;
};
