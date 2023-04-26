import axios from "axios";
import React, { useCallback, useEffect } from "react";

import Player from "./Player";
import LeftPart from "./LeftPart";
import RightPart from "./RightPart";
import MiddleControls from "./MiddleControls";
import { spotifyApiHeaders } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentSongIndex, setPlaylist } from "@/redux";

import styles from "@/styles/NowPlayingBar.module.css";

const NowPlayingBar: React.FC = () => {
    const playlistURL = useAppSelector(state => state.player.playlistURL);
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();

    const fetchPlaylist = useCallback(
        async (accessToken: string, playlistURL: string) => {
            const res = await axios.get<GetPlaylistItemsResponse | GetAlbumTracksResponse | GetArtistTopTracksResponse>(
                playlistURL,
                {
                    headers: spotifyApiHeaders(accessToken)
                }
            );

            const tracks = "tracks" in res.data ? res.data.tracks : res.data.items;

            let playlist = tracks.map<PlaylistItem>(track => {
                if (!("preview_url" in track)) {
                    track = track.track;
                }

                return { id: track.id, url: track.preview_url };
            });

            playlist = playlist.filter(track => track.url);

            dispatch(setPlaylist(playlist));
        },
        [dispatch]
    );

    useEffect(() => {
        if (!playlistURL || !accessToken) {
            return;
        }

        fetchPlaylist(accessToken, playlistURL);

        dispatch(setCurrentSongIndex(0));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, dispatch, fetchPlaylist, playlistURL]);

    return (
        <footer
            className={"w-full h-[5.625rem] bg-[#181818] px-4"
                .concat(" border border-solid border-[#282828]")
                .concat(" flex justify-between items-center")
                .concat(" ", styles.wrapper)}
        >
            <LeftPart />

            <MiddleControls />

            <RightPart />

            <Player />
        </footer>
    );
};

export default NowPlayingBar;
