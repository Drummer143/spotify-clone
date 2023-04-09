import axios from "axios";

import { spotifyApiHeaders } from "../../utils";

const URL = (playlistId: string) => `https://api.spotify.com/v1/playlists/${playlistId}/followers`;

export const followPlaylist = async (accessToken: string, playlistId: string) => {
    const res = await axios.put<"">(URL(playlistId), { public: true }, { headers: spotifyApiHeaders(accessToken) });

    console.log(res.data);

    return res.data;
};

export const unfollowPlaylist = async (accessToken: string, playlistId: string) => {
    const res = await axios.delete<"">(URL(playlistId), {
        headers: spotifyApiHeaders(accessToken)
    });

    return res.data;
}
