import { useCallback, useEffect, useState } from "react";

type PlayerEventListener = (event: Event) => void;

type UsePlayerProps = {
    paused: boolean;
    volume: number;
    muted?: boolean;
    playlist: {
        url: string;
    }[];

    startSongIndex?: number;

    onEnded: PlayerEventListener;
    onPause: PlayerEventListener;
    onPlay: PlayerEventListener;
    onNextTrack: (duration: number) => void;
    onTimeUpdate: (currentTime: number, duration: number) => void;
};

export const usePlayer = ({
    paused,
    playlist,
    volume,
    onEnded,
    onPause,
    onPlay,
    startSongIndex = 0,
    onTimeUpdate,
    onNextTrack,
    muted = false
}: UsePlayerProps) => {
    const [player] = useState(new Audio());
    const [currentSongIndex, setCurrentSongIndex] = useState(startSongIndex);

    const setCurrentTime = useCallback(
        (time: number) => {
            player.currentTime = time;
        },
        [player]
    );

    useEffect(() => {
        player.autoplay = true;

        player.ontimeupdate = () => onTimeUpdate(isNaN(player.currentTime) ? 0 : player.currentTime, player.duration);

        player.onended = e => {
            setCurrentSongIndex(prev => prev + 1);

            onEnded(e);
        };

        player.onloadedmetadata = () => onNextTrack(player.duration);

        player.onpause = onPause;

        player.onplay = onPlay;
    }, [onEnded, onNextTrack, onPause, onPlay, onTimeUpdate, player]);

    useEffect(() => {
        if (playlist.length < currentSongIndex) {
            return;
        }

        if (playlist[currentSongIndex]?.url) {
            player.src = playlist[currentSongIndex].url;
        } else {
            setCurrentSongIndex(prev => prev + 1);
        }
    }, [currentSongIndex, player, playlist]);

    useEffect(() => {
        if (paused) {
            player.pause();
        } else if (player.paused) {
            player.play();
        }
    }, [paused, player]);

    useEffect(() => {
        player.volume = volume;
    }, [player, volume]);

    useEffect(() => {
        player.muted = muted;
    }, [muted, player]);

    return { setCurrentTime, currentSongIndex, setCurrentSongIndex };
};
