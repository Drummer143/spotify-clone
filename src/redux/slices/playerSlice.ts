import { buildPlaylistURL } from "@/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type RepeatValues = "no" | "playlist" | "single";

const repeatValuesArray: Readonly<RepeatValues>[] = ["no", "playlist", "single"];

interface PlayerState {
    shuffle: boolean;
    repeat: RepeatValues;
    currentPlayTime: number;
    currentSongIndex: number;
    playlist: Playlist;
    playNextQueue: Playlist;
    paused: boolean
    volume: number
    muted: boolean
    currentSongDuration: number

    playlistURL?: string
    prevSong?: string
    currentSong?: string
    nextSong?: string
}

const initialState: PlayerState = {
    currentPlayTime: 0,
    currentSongDuration: 0,
    repeat: "no",
    shuffle: false,
    paused: false,
    currentSongIndex: 0,
    playlist: [],
    playNextQueue: [],
    volume: 0.25,
    muted: false
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        toggleShuffle: state => {
            state.shuffle = !state.shuffle;
        },
        toggleRepeat: state => {
            const index = repeatValuesArray.indexOf(state.repeat);

            const nextIndex = (index + 1) % 3;

            state.repeat = repeatValuesArray[nextIndex];
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        toggleMute: (state) => {
            state.muted = !state.muted;
        },
        setPlaylistURL: (state, { payload: { id, type } }: PayloadAction<{
            id: string,
            type: Extract<ItemType, "album" | "artist" | "playlist">
        }>) => {
            state.playlistURL = buildPlaylistURL(id, type);
        },
        setPlaylist: (state, action: PayloadAction<Playlist>) => {
            state.playlist = action.payload;

            state.currentPlayTime = 0;
            state.paused = false;
            state.currentSongIndex = 0;
            state.playlistURL = undefined;
        },
        setCurrentSongIndex: (state, { payload }: PayloadAction<"next" | "prev" | number>) => {
            if (payload === "next") {
                state.currentSongIndex++;
            } else if (payload === "prev") {
                state.currentSongIndex--;
            } else {
                state.currentSongIndex = payload;
            }
        },
        setPaused: (state, action: PayloadAction<boolean | undefined>) => {
            if (typeof action.payload === "undefined") {
                state.paused = !state.paused;
            } else {
                state.paused = action.payload;
            }
        },
        setCurrentPlayTime: (state, action: PayloadAction<number>) => {
            state.currentPlayTime = action.payload;
        },
        setCurrentSongDuration: (state, action: PayloadAction<number>) => {
            state.currentSongDuration = action.payload;
        }
    }
});

export default playerSlice;

export const {
    setPaused,
    setVolume,
    toggleMute,
    setPlaylist,
    toggleRepeat,
    toggleShuffle,
    setPlaylistURL,
    setCurrentPlayTime,
    setCurrentSongIndex,
    setCurrentSongDuration
} = playerSlice.actions;
