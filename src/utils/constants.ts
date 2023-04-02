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

export const spotifyApiHeaders = (accessToken: string) => ({
    "Authorization": `Bearer ${accessToken}`
});