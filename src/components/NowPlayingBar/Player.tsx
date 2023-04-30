import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import { useAppSelector, useAppDispatch, usePlayer } from "@/hooks";
import {
    setPaused,
    setCurrentPlayTime,
    setCurrentSongDuration,
    setCurrentSongIndex as reduxSetCurrentSongIndex
} from "@/redux";

const Player: React.FC = () => {
    const { muted, paused, playlist, volume, currentSongIndex, currentPlayTime, repeat } = useAppSelector(
        state => state.player
    );

    const dispatch = useAppDispatch();

    const {
        setCurrentSongIndex,
        setCurrentTime,
        currentSongIndex: playerIndex
    } = usePlayer({
        paused,
        startSongIndex: currentSongIndex,
        volume,
        loopPlaylist: repeat === "playlist",
        loopTrack: repeat === "single",
        playlist: playlist,
        muted,
        onTimeUpdate: currentTime => dispatch(setCurrentPlayTime(currentTime)),
        onNextTrack: trackDuration => dispatch(setCurrentSongDuration(trackDuration))
        // onPause: () => {
        //     if (!paused) {
        //         dispatch(setPaused(true));
        //     }
        // },
        // onPlay: () => {
        //     if (paused) {
        //         dispatch(setPaused(false));
        //     }
        // }
    });

    useEffect(() => {
        dispatch(reduxSetCurrentSongIndex(playerIndex));
    }, [dispatch, playerIndex, setCurrentSongIndex]);

    useEffect(() => {
        const handleSpaceDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault();
                dispatch(setPaused());
            }
        };

        document.addEventListener("keydown", handleSpaceDown);
        dispatch(setPaused(true));
        setCurrentSongIndex(currentSongIndex);

        if ("mediaSession" in navigator) {
            navigator.mediaSession.setActionHandler("pause", () => dispatch(setPaused(true)));
            navigator.mediaSession.setActionHandler("play", () => dispatch(setPaused(false)));
        }

        return () => {
            document.removeEventListener("keydown", handleSpaceDown);
        };

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

    return <></>;
};

export default dynamic(() => Promise.resolve(Player), { ssr: false });
