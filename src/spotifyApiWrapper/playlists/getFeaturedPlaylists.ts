import axios from "axios";

import { spotifyApiHeaders } from "../../utils";

const URL = "https://api.spotify.com/v1/browse/featured-playlists";

type SearchParams = {
    country?: string;
    locale?: string;
    limit?: number;
    offset?: number;
};

export const getFeaturedPlaylists = async (accessToken: string, search: SearchParams) => {
    const searchParams = new URLSearchParams();

    Object.entries(search).forEach(([key, value]) => {
        if (value) {
            searchParams.append(key, value.toString());
        }
    });

    const response = await axios.get(`${URL}?${searchParams.toString()}`, {
        headers: spotifyApiHeaders(accessToken)
    });

    return response.data;
};
