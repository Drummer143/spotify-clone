import { createSlice } from "@reduxjs/toolkit";

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
    playNextQueue: []
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
        }
    }
});

export default playerSlice;

export const { toggleRepeat, toggleShuffle } = playerSlice.actions;
