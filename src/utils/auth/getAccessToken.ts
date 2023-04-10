/* eslint-disable camelcase */

import axios from "axios";

const URL = "https://accounts.spotify.com/api/token";

export const getAccessToken = async (userCode: string, codeVerifier: string) => {
    const response = await axios.post<GetAccessTokenResponse>(
        URL,
        {
            grant_type: "authorization_code",
            code: userCode,
            redirect_uri: import.meta.env.VITE_REDIRECT_URI,
            client_id: import.meta.env.VITE_SPOTIFY_API_KEY,
            code_verifier: codeVerifier
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    return response.data;
};
