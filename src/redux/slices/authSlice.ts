import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAccessToken as spotifyGetAccessToken } from "src/spotifyApiWrapper/auth/getAccessToken";

interface AuthState {
    codeVerifier?: string
    accessToken?: string
}

const initialState: AuthState = {};

export const getAccessToken = createAsyncThunk<
    GetAccessTokenResponse,
    string,
    { state: { auth: AuthState } }
>(
    "auth/getAccessToken",
    async (code, { getState, rejectWithValue }) => {
        const { codeVerifier } = getState().auth;

        if (!codeVerifier) {
            return rejectWithValue("Can't login without code verifier.");
        }


        try {
            const response = await spotifyGetAccessToken(code, codeVerifier);

            console.log(response);

            return response;
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
        builder.addCase(getAccessToken.fulfilled, (state, action) => {
            state.accessToken = action.payload.access_token;
            state.accessToken = undefined;
        });
    }
});

export const { setAccessToken, setCodeVerifier } = authSlice.actions;
