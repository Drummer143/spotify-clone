import axios from "axios";

import { spotifyApiHeaders } from "src/utils/constants";

const buildURL = (categoryName: string) => `https://api.spotify.com/v1/browse/categories/${categoryName}/playlists`;

export const getCategorysPlaylists =
    async (categoryName: string, accessToken: string, limit?: number, offset?: number, country?: string): Promise<GetCategorysPlaylistsResponse> => {
        const searchParams = new URLSearchParams();

        Object.entries({ limit, offset, country }).forEach(([key, value]) => {
            if (value) {
                searchParams.append(key, value.toString());
            }
        });

        const response = await axios.get(`${buildURL(categoryName)}?${searchParams.toString()}`, {
            headers: spotifyApiHeaders(accessToken)
        });

        return response.data;
    };
