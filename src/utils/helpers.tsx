import React from "react";
import moment from "moment";

import ListingOfAuthors from "../components/ListingOfAuthors";
import GoogleMaterialIcon from "../components/GoogleMaterialIcon";

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
    [parameter: string]: number | string | number[] | string[];
};

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

export const createDescription = (item: ArtistInfo | AlbumInfo | PlaylistInfo | ShowInfo | EpisodeInfo) => {
    switch (item.type) {
        case "album": {
            return (
                <>
                    <span className="text-inherit">{new Date(item.release_date).getFullYear()}</span>
                    <ListingOfAuthors artists={item.artists} />
                </>
            );
        }
        case "artist":
            return "Artist";
        case "episode": {
            return (
                <div className="line-clamp-1">
                    <span>{item.explicit && <GoogleMaterialIcon iconName="explicit" />}</span>
                    <span>{moment(item.release_date).format("MMM YYYY")}</span>
                    <span>{Math.round(item.duration_ms / 1000 / 60)} min</span>
                </div>
            );
        }
        case "playlist":
            return item.description;
        case "show":
            return item.description;
    }
};

export const isURL = (urlToCheck: string) => {
    try {
        const url = new URL(urlToCheck);

        if (url.host) {
            return true;
        }

        return false;
    } catch (_) {
        return false;
    }
};
