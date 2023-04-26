import { useCallback, useEffect, useState } from "react";

type PlayerEventListener = (event: Event) => void;

type UsePlayerProps = {
    paused: boolean;
    volume: number;
    muted?: boolean;
    loopTrack?: boolean;
    loopPlaylist?: boolean;
    playlist: {
        url: string;
    }[];

    startSongIndex?: number;

    // onEnded: (values: { event: Event, trackNumber: number }) => void;
    onPause: PlayerEventListener;
    onPlay: PlayerEventListener;
    onNextTrack: (duration: number) => void;
    onTimeUpdate: (currentTime: number, duration: number) => void;
};

export const usePlayer = ({
    paused,
    playlist,
    volume,
    // onEnded,
    onPause,
    onPlay,
    loopPlaylist,
    startSongIndex = 0,
    onTimeUpdate,
    onNextTrack,
    muted = false,
    loopTrack = false
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
        player.controls = true;

        if ("mediaSession" in navigator) {
            navigator.mediaSession.setActionHandler("previoustrack", () => {
                setCurrentSongIndex(prev => (prev - 1 === -1 ? playlist.length - 1 : prev - 1));
            });

            navigator.mediaSession.setActionHandler("nexttrack", () => {
                setCurrentSongIndex(prev => (prev + 1 === playlist.length ? 0 : prev + 1));
            });
        }

        player.ontimeupdate = () => onTimeUpdate(isNaN(player.currentTime) ? 0 : player.currentTime, player.duration);

        player.onended = (/* e */) => {
            const nextIndex = currentSongIndex + 1 < playlist.length || !loopPlaylist ? currentSongIndex + 1 : 0;

            setCurrentSongIndex(nextIndex);

            // onEnded({ event: e, trackNumber: nextIndex });
        };

        player.onloadedmetadata = () => onNextTrack(player.duration);

        player.onpause = onPause;

        player.onplay = onPlay;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [/* onEnded, */ onNextTrack, onPause, onPlay, onTimeUpdate, player]);

    useEffect(() => {
        if (playlist.length <= currentSongIndex) {
            return;
        }

        if (playlist[currentSongIndex]?.url) {
            player.src = playlist[currentSongIndex].url;
        } else {
            setCurrentSongIndex(prev => prev + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    useEffect(() => {
        player.loop = loopTrack;
    }, [loopTrack, player]);

    return { setCurrentTime, currentSongIndex, setCurrentSongIndex };
};
