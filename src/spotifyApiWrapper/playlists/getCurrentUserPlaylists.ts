import axios from "axios";
import { spotifyApiHeaders } from "src/utils/constants";

const DEFAULT_URL = "https://api.spotify.com/v1/me/playlists";

export const getCurrentUserPlaylist =
    async (accessToken: string, limit?: number, offset?: number): Promise<GetUserPlaylistsResponse> => {
        const searchParams = new URLSearchParams();

        if (limit) {
            searchParams.append("limit", limit.toString());
        }

        if (offset) {
            searchParams.append("offset", offset.toString());
        }

        const response = await axios.get(`${DEFAULT_URL}?${searchParams.toString()}`, {
            headers: spotifyApiHeaders(accessToken)
        });

        return response.data;
    };