import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    codeVerifier?: string
    accessToken?: string
}

const initialState: AuthState = {};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.codeVerifier = undefined;
        },
        setCodeVerifier: (state, action: PayloadAction<string>) => {
            state.codeVerifier = action.payload;
        }
    }
});

export const { setAccessToken, setCodeVerifier } = authSlice.actions;
