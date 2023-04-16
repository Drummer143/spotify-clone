/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            boxShadow: {
                "header-menu": "0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)",
                "playlist-card": "0 8px 8px rgb(0 0 0 / 30%)",
                "playlist-cover-image": "0 4px 60px rgb(0 0 0 / 50%)",
                "edit-playlist-modal": "0 4px 4px rgb(0 0 0 / 30%)"
            },
            backgroundImage: {
                "action-bar-gradient": "linear-gradient(rgba(0, 0, 0, 0.6) 0, #121212 100%), var(--background-noise)",
                "liked-song-in-playlists-collection": "linear-gradient(149.46deg,#450af5,#8e8ee5 99.16%)",
                "liked-episodes-in-playlists-collection": "linear-gradient(.316turn,#00644e 50.57%,#27856a)"
            },
            gridTemplateColumns: {
                "tracklist-5": "[index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(120px, 1fr)",
                "tracklist-4": "[index] 16px [first] 4fr [var1] 2fr [last] minmax(120px, 1fr)",
                "tracklist-3": "[index] 16px [first] 4fr [last] minmax(120px, 1fr)",
                "tracklist-2": "[first] 4fr [last] minmax(120px,1fr)",
                "dynamic": "repeat(var(--cards-count), minmax(0, 1fr))"
            },
            gap: {
                "dynamic": "var(--collection-gap)"
            },
            padding: {
                "content-spacing": "var(--content-spacing)"
            }
        }
    },
    plugins: [],
}
