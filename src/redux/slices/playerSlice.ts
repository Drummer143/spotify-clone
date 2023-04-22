import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type RepeatValues = "no" | "playlist" | "single";

const repeatValuesArray: Readonly<RepeatValues>[] = ["no", "playlist", "single"];

interface PlayerState {
    shuffle: boolean;
    repeat: RepeatValues;
    currentPlayTime: number;
    currentSongIndex: number;
    playlist: string[];
    playNextQueue: string[];
    paused: boolean
    volume: number
    muted: boolean

    playlistURL?: string
    prevSong?: string
    currentSong?: string
    nextSong?: string
}

const initialState: PlayerState = {
    currentPlayTime: 0,
    repeat: "no",
    shuffle: false,
    paused: false,
    currentSongIndex: 0,
    playlist: [],
    playNextQueue: [],
    volume: 25,
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
        setPlaylistURL: (state, action: PayloadAction<string>) => {
            state.playlistURL = action.payload;
        }
    }
});

export default playerSlice;

export const { toggleRepeat, toggleShuffle, setVolume, toggleMute } = playerSlice.actions;
