import React, { useEffect, useRef, useState } from "react";

import { useAppSelector } from "src/hooks/reduxHooks";
import { useResizeObserver } from "src/hooks/useResizeObserver";
import { getSeveralBrowseCategories } from "src/spotifyApiWrapper/categories/getSeveralBrowseCategories";
import { getCategorysPlaylists } from "src/spotifyApiWrapper/playlists/getCategorysPlaylists";
import PlaylistCard from "./PlaylistCard";

const MainPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo | undefined>();

    const mainPageContainerRef = useRef<HTMLDivElement>(null);

    useResizeObserver({
        targetRef: mainPageContainerRef,
        onResize: e => console.log(e[0])
    });

    const getPlaylists = async (accessToken: string) => {
        const res = await getSeveralBrowseCategories(
            accessToken,
            Intl.DateTimeFormat().resolvedOptions().locale.slice(-2),
            undefined,
            1
        );

        const categoryName = res.categories.items[0].id;

        const { playlists: { items: [playlist] } } = await getCategorysPlaylists(categoryName, accessToken, 1);

        console.log(playlist);
        setPlaylistInfo(playlist);
    };

    useEffect(() => {
        if (accessToken) {
            getPlaylists(accessToken);
        }
    }, []);

    return (
        <div ref={mainPageContainerRef}>
            {playlistInfo && (
                <PlaylistCard
                    imageUrl={playlistInfo.images[0].url}
                    name={playlistInfo.name}
                    playlistUrl={playlistInfo.href}
                    description={playlistInfo.description}
                />
            )}
        </div>
    );
};

export default MainPage;