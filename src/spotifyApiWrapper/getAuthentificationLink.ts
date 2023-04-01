/* eslint-disable camelcase */

const body = {
    response_type: "code",
    client_id: import.meta.env.VITE_SPOTIFY_API_KEY,
    scope: "user-read-private user-read-email",
    redirect_uri: import.meta.env.VITE_REDIRECT_URI
};

const URL_BASE = "https://accounts.spotify.com/authorize?";

export const getAuthentificationLink = () => URL_BASE + new URLSearchParams(body);