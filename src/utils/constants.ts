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

export const createUserMenuLinks = (userId: string) => [
    { text: "Account", to: "https://www.spotify.com/account/" },
    { text: "Profile", to: `/user/${userId}`, internal: true },
    { text: "Upgrade to Premium", to: "https://www.spotify.com/premium/" },
    { text: "Support", to: "https://support.spotify.com/" },
    { text: "Download", to: "https://spotify.com/download" },
    { text: "Settings", to: "/preferences", internal: true }
];

export const spotifyApiHeaders = (accessToken: string) => ({
    Authorization: `Bearer ${accessToken}`
});
