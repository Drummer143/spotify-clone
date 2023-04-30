import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface HistoryState {
    historyLength: number
    currentIndex: number
    canMoveBack: boolean
    canMoveForward: boolean
}

const initialState: HistoryState = {
    currentIndex: 0,
    historyLength: 0,
    canMoveBack: false,
    canMoveForward: false
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        goBack: (state) => {
            state.currentIndex--;
            state.canMoveForward = true;

            state.canMoveBack = state.currentIndex !== 0;
        },

        goForward: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                if (state.currentIndex === state.historyLength) {
                    state.historyLength++;
                } else {
                    state.historyLength = state.currentIndex + 1;
                }
            }

            state.currentIndex++;

            state.canMoveForward = state.currentIndex !== state.historyLength;

            state.canMoveBack = true;
        }
    }
});

export default historySlice;

export const { goBack, goForward } = historySlice.actions;
