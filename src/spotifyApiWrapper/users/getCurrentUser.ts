import axios from "axios";

import { spotifyApiHeaders } from "../../utils";

const URL = "https://api.spotify.com/v1/me";

export const getCurrentUser = async (accessToken: string) => {
    const response = await axios.get<GetCurrentUserResponse>(URL, { headers: spotifyApiHeaders(accessToken) });

    return response.data;
};