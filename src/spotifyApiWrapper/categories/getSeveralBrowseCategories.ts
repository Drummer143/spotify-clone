import axios from "axios";

import { spotifyApiHeaders } from "../../utils";

const URL = "https://api.spotify.com/v1/browse/categories";

export const getSeveralBrowseCategories = async (
    accessToken: string,
    country?: string,
    locale?: string,
    limit?: number,
    offset?: number
): Promise<GetSeveralBrowseCategoriesResponse> => {
    const searchParams = new URLSearchParams();

    Object.entries({ limit, offset, country, locale }).forEach(([key, value]) => {
        if (value) {
            searchParams.append(key, value.toString());
        }
    });

    const response = await axios.get(`${URL}?${searchParams.toString()}`, {
        headers: spotifyApiHeaders(accessToken)
    });

    return response.data;
};
