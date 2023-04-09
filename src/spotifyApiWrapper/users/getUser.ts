import axios from "axios";
import { spotifyApiHeaders } from "../../utils";

const URL = "https://api.spotify.com/v1/users";

export const getUser = async (accessToken: string, id: string): Promise<GetUserResponse> => {
    const res = await axios.get(`${URL}/${id}`, {
        headers: spotifyApiHeaders(accessToken)
    });

    return res.data;
}