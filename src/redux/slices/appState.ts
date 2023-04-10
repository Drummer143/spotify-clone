import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { defaultHeadersBGColors } from "../../utils";

interface AppState {
    title: string;
    headerBGColor: ColorPair;
}

const initialState: AppState = {
    headerBGColor: defaultHeadersBGColors.nonAuthentificated,
    title: "Spotify Clone"
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
        setTitle: (state, action: PayloadAction<AppState["title"] | undefined>) => {
            state.title = action.payload || initialState.title;
        }
    }
});

export default appSlice;

export const { changeHeadBGColor, setTitle } = appSlice.actions;
