/* eslint-disable camelcase */

const scopes = ["user-read-private", "user-read-email", "playlist-read-private", "user-read-recently-played"];

const createBody = (codeChallenge: string) => ({
    response_type: "code",
    client_id: import.meta.env.VITE_SPOTIFY_API_KEY,
    scope: scopes.join(" "),
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    code_challenge_method: "S256",
    code_challenge: codeChallenge
});

const URL_BASE = "https://accounts.spotify.com/authorize?";

export const getAuthentificationLink = (codeChallenge: string) =>
    URL_BASE + new URLSearchParams(createBody(codeChallenge));
