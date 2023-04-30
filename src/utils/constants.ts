export const navBarBottomLinks = [
    { to: "https://www.spotify.com/legal/", text: "Legal" },
    { to: "https://www.spotify.com/privacy/", text: "Privacy Center" },
    { to: "https://www.spotify.com/legal/privacy-policy/", text: "Privacy Policy" },
    { to: "https://www.spotify.com/legal/cookies-policy/", text: "Cookies" },
    { to: "https://www.spotify.com/legal/privacy-policy/#s3/", text: "About Ads" }
];

export const headerLinks = [
    { to: "https://www.spotify.com/premium", text: "Premium" },
    { to: "https://support.spotify.com/", text: "Support" },
    { to: "https://www.spotify.com/download/", text: "Download" }
];

export const defaultHeadersBGColors: { [key in "authentificated" | "nonAuthentificated"]: ColorPair } = {
    nonAuthentificated: ["#12121200", "#121212"],
    authentificated: ["#4820B000", "#4820B0"]
};

export const headerCollectionSwitchButtons = ["playlists", "podcasts", "artists", "albums"];

export const searchTypesOrder: Exclude<keyof SearchForItemResponse, "tracks">[] = [
    "artists",
    "albums",
    "playlists",
    "shows",
    "episodes"
];

export const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

export const SAVED_SONGS_ID = "saved songs";