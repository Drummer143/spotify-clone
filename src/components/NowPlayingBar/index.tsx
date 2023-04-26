import axios from "axios";
import React, { useCallback, useEffect } from "react";
import dynamic from "next/dynamic";

import LeftPart from "./LeftPart";
import RightPart from "./RightPart";
import MiddleControls from "./MiddleControls";
import { spotifyApiHeaders } from "@/utils";
import { useAppDispatch, useAppSelector, usePlayer } from "@/hooks";
import {
    setCurrentSongIndex as reduxSetCurrentSongIndex,
    setCurrentPlayTime,
    setCurrentSongDuration,
    setPaused,
    setPlaylist
} from "@/redux";

import styles from "@/styles/NowPlayingBar.module.css";

const NowPlayingBar: React.FC = () => {
    const { muted, paused, playlist, volume, playlistURL, currentSongIndex, currentPlayTime, repeat } = useAppSelector(
        state => state.player
    );
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();

    const {
        setCurrentSongIndex,
        setCurrentTime,
        currentSongIndex: playerIndex
    } = usePlayer({
        paused,
        volume,
        loopPlaylist: repeat === "playlist",
        loopTrack: repeat === "single",
        playlist: playlist,
        muted,
        // onEnded: ({ trackNumber }) => dispatch(reduxSetCurrentSongIndex(trackNumber)),
        onTimeUpdate: currentTime => dispatch(setCurrentPlayTime(currentTime)),
        onNextTrack: trackDuration => dispatch(setCurrentSongDuration(trackDuration)),
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
        dispatch(reduxSetCurrentSongIndex(playerIndex));
    }, [dispatch, playerIndex, setCurrentSongIndex]);

    useEffect(() => {
        dispatch(setPaused(true));
        setCurrentSongIndex(currentSongIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setCurrentSongIndex(currentSongIndex);
    }, [currentSongIndex, setCurrentSongIndex]);

    useEffect(() => {
        if (paused) {
            setCurrentTime(currentPlayTime);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPlayTime, setCurrentTime]);

    useEffect(() => {
        if (!playlistURL || !accessToken) {
            return;
        }

        fetchPlaylist(accessToken, playlistURL);

        setCurrentSongIndex(0);
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
        </footer>
    );
};

export default dynamic(() => Promise.resolve(NowPlayingBar), { ssr: false });
