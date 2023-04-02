import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAccessToken as spotifyGetAccessToken } from "src/spotifyApiWrapper/auth/getAccessToken";
import { getCurrentUser as spotifyGetCurrentUser } from "src/spotifyApiWrapper/users/getCurrentUser";
import { RootState } from "../store";

interface AuthState {
    codeVerifier?: string
    accessToken?: string
    user?: User
}

type State = { state: RootState }

const initialState: AuthState = {};

export const getAccessToken = createAsyncThunk<
    GetAccessTokenResponse,
    string,
    State
>(
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

export const getCurrentUser = createAsyncThunk<
    User,
    void,
    State
>(
    "auth/getCurrentUser",
    async (_, { getState, rejectWithValue }) => {
        const accessToken = getState().auth.accessToken;

        if (!accessToken) {
            return rejectWithValue("Can't login without access token");
        }

        try {
            return spotifyGetCurrentUser(accessToken);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

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
    },
    extraReducers: builder => {
        builder
            .addCase(getAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.access_token;
                state.codeVerifier = undefined;

            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    }
});

export const { setAccessToken, setCodeVerifier } = authSlice.actions;
