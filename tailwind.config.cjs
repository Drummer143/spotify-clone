/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                "header-menu": "0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)",
                "playlist-card": "0 8px 8px rgb(0 0 0 / 30%)",
                "playlist-cover-image": "0 4px 60px rgb(0 0 0 / 50%)"
            },
            backgroundImage: {
                "action-bar-gradient": "linear-gradient(rgba(0, 0, 0, 0.6) 0, #121212 100%), var(--background-noise)"
            },
            gridTemplateColumns: {
                "tracklist-5": "[index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(120px,1fr)",
                "tracklist-4": "[index] 16px [first] 4fr [var1] 2fr [last] minmax(120px,1fr)",
                "tracklist-3": "[index] 16px [first] 4fr [last] minmax(120px,1fr)"
            }
        }
    },
    plugins: [
        require("@tailwindcss/line-clamp")
    ]
};
