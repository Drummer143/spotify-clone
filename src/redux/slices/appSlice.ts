import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { defaultHeadersBGColors } from "@/utils";

interface AppState {
    currentModal?: "playlist";
    headerBGColor: ColorPair;
    countOfCardsInColumn: number;
    isHeaderPlayButtonVisible: boolean;
}

const initialState: AppState = {
    headerBGColor: defaultHeadersBGColors.nonAuthentificated,
    countOfCardsInColumn: 5,
    isHeaderPlayButtonVisible: false
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changeHeadBGColor: (
            state,
            action: PayloadAction<AppState["headerBGColor"] | keyof typeof defaultHeadersBGColors>
        ) => {
            if (Array.isArray(action.payload)) {
                state.headerBGColor = action.payload;
            } else {
                state.headerBGColor = defaultHeadersBGColors[action.payload];
            }
        },

        setCountOfCardsInColumn: (state, action: PayloadAction<AppState["countOfCardsInColumn"]>) => {
            state.countOfCardsInColumn = action.payload;
        },

        setCurrentModal: (state, action: PayloadAction<AppState["currentModal"]>) => {
            state.currentModal = action.payload;
        },

        setHeaderPlayButtonVisibility: (state, action: PayloadAction<boolean>) => {
            state.isHeaderPlayButtonVisible = action.payload;
        }
    }
});

export default appSlice;

export const {
    changeHeadBGColor,
    setCountOfCardsInColumn,
    setCurrentModal,
    setHeaderPlayButtonVisibility
} = appSlice.actions;
