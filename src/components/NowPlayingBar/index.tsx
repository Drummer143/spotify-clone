import axios from "axios";
import React, { useCallback, useEffect } from "react";
import dynamic from "next/dynamic";

import LeftPart from "./LeftPart";
import RightPart from "./RightPart";
import MiddleControls from "./MiddleControls";
import { spotifyApiHeaders } from "@/utils";
import { useAppDispatch, useAppSelector, usePlayer } from "@/hooks";
import { setCurrentSongIndex as reduxSetCurrentSongIndex, setCurrentPlayTime, setCurrentSongDuration, setPaused, setPlaylist } from "@/redux";

import styles from "@/styles/NowPlayingBar.module.css";

const NowPlayingBar: React.FC = () => {
    const {
        currentPlayTime,
        currentSongIndex,
        muted,
        paused,
        playNextQueue,
        playlist,
        repeat,
        shuffle,
        volume,
        currentSong,
        nextSong,
        playlistURL,
        prevSong
    } = useAppSelector(state => state.player);
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();

    const { setCurrentSongIndex, setCurrentTime } = usePlayer({
        paused,
        volume,
        playlist: playlist,
        onEnded: () => dispatch(reduxSetCurrentSongIndex("next")),
        onTimeUpdate: (currentTime) => dispatch(setCurrentPlayTime(currentTime)),
        onNextTrack: (trackDuration) => dispatch(setCurrentSongDuration(trackDuration)),
        muted,
        onPause: () => {
            if (!paused) {
                dispatch(setPaused(true));
            }
        },
        onPlay: () => {
            if (paused) {
                dispatch(setPaused(false));
            }
        }
    });

    const fetchPlaylist = useCallback(async (accessToken: string, playlistURL: string) => {
        const res = await axios.get<GetPlaylistItemsResponse | GetAlbumTracksResponse | GetArtistTopTracksResponse>(playlistURL, {
            headers: spotifyApiHeaders(accessToken)
        });

        const tracks = "tracks" in res.data ? res.data.tracks : res.data.items;

        let playlist = tracks.map<PlaylistItem>(track => {
            if (!("preview_url" in track)) {
                track = track.track;
            }

            return ({ id: track.id, url: track.preview_url });
        });

        playlist = playlist.filter(track => track.url);

        dispatch(setPlaylist(playlist));
    }, [dispatch]);

    useEffect(() => {
        dispatch(setPaused(true));
    }, [dispatch]);

    useEffect(() => {
        if (!playlistURL || !accessToken) {
            return;
        }

        fetchPlaylist(accessToken, playlistURL);

        setCurrentSongIndex(0);
    }, [accessToken, dispatch, fetchPlaylist, playlistURL, setCurrentSongIndex]);

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
        </footer>
    );
};

export default dynamic(() => Promise.resolve(NowPlayingBar), { ssr: false });
