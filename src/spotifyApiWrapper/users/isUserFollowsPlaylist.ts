import axios from "axios";

import { spotifyApiHeaders } from "../../utils";

const URL = (playlistId: string) => `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains`;

export const isUserFollowsPlaylist = async (accessToken: string, playlistId: string, userIds: string | string[]): Promise<boolean[]> => {
    userIds = Array.isArray(userIds) ? userIds.join(",") : userIds;

    const res = await axios.get<boolean[]>(`${URL(playlistId)}?ids=${userIds}`, {
        headers: spotifyApiHeaders(accessToken)
    });

    return res.data;
};