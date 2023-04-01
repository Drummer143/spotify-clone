import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface AuthState {
    accessToken?: string
}

const initialState: AuthState = {};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        }
    }
});

export const { setAccessToken } = authSlice.actions;
