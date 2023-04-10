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

type StringifySearchParamsProps = {
    [parameter: string]: number | string | number[] | string[]
}

export const stringifySearchParams = (params?: StringifySearchParamsProps) => {
    if (!params || !Object.keys(params).length) {
        return "";
    }

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            searchParams.append(key, value.toString());
        }
    });

    return searchParams.toString();
};

export function generateRandomString(length: number) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

export async function generateCodeChallenge(codeVerifier: string) {
    function base64encode(string: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string as any) as any))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return base64encode(digest as any);
}

export const getDarkenColor = (color: string) => {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5), 16);

    r = Math.round(r * 0.5);
    g = Math.round(g * 0.5);
    b = Math.round(b * 0.5);

    let newR = (r < 255 ? r : 255).toString(16);
    let newG = (g < 255 ? g : 255).toString(16);
    let newB = (b < 255 ? b : 255).toString(16);

    newR = newR.length === 1 ? "0".concat(newR) : newR;
    newG = newG.length === 1 ? "0".concat(newG) : newG;
    newB = newB.length === 1 ? "0".concat(newB) : newB;

    return `#${newR}${newG}${newB}`;
};
