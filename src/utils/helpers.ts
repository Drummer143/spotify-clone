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
