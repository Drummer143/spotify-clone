import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { PERSIST_KEY, RootState } from "..";
import { getAccessToken as spotifyGetAccessToken } from "@/utils";

interface AuthState {
    codeVerifier?: string;
    accessToken?: string;
    currentUserInfo?: {
        id: string;
        name: string;
    };
}

type State = { state: RootState };

const initialState: AuthState = {};

export const getAccessToken = createAsyncThunk<GetAccessTokenResponse, string, State>(
    "auth/getAccessToken",
    async (code, { getState, rejectWithValue }) => {
        const { codeVerifier } = getState().auth;

        if (!codeVerifier) {
            return rejectWithValue("Can't login without code verifier.");
        }

        try {
            return await spotifyGetAccessToken(code, codeVerifier);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.codeVerifier = undefined;
        },

        setCodeVerifier: (state, action: PayloadAction<string>) => {
            state.codeVerifier = action.payload;
        },

        setCurrentUserInfo: (state, action: PayloadAction<{ id: string; name: string }>) => {
            state.currentUserInfo = action.payload;
        },

        logOut: state => {
            state.accessToken = undefined;
            state.codeVerifier = undefined;
            state.currentUserInfo = undefined;
            localStorage.removeItem(`persist:${PERSIST_KEY}`);
        }
    },
    extraReducers: builder => {
        builder.addCase(getAccessToken.fulfilled, (state, action) => {
            state.accessToken = action.payload.access_token;
            state.codeVerifier = undefined;
        });
    }
});

export default authSlice;

export const { setAccessToken, setCodeVerifier, logOut, setCurrentUserInfo } = authSlice.actions;
