/* eslint-disable camelcase */

import axios from "axios";

const scopes = [
    "user-read-email",
    "user-read-private",
    "user-read-recently-played",

    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private"
];

const createBody = (codeChallenge: string) => ({
    response_type: "code",
    client_id: import.meta.env.VITE_SPOTIFY_API_KEY,
    scope: scopes.join(" "),
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    code_challenge_method: "S256",
    code_challenge: codeChallenge
});

export const getAuthentificationLink = (codeChallenge: string) =>
    "https://accounts.spotify.com/authorize?" + new URLSearchParams(createBody(codeChallenge));

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