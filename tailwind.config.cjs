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
            }
        }
    },
    plugins: [
        require("@tailwindcss/line-clamp")
    ]
};
