import axios from "axios";

import { spotifyApiHeaders } from "src/utils/constants";

export const url = "https://spotify23.p.rapidapi.com/playlist";

export const getPlaylist = async (id: string) => {
    const response = await axios.get<GetPlaylistResponse>(`${url}/?id=${id}&limit=1`, { headers: spotifyApiHeaders });

    return response.data;
}