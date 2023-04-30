import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers, persistStore } from "redux-persist";

import appSlice from "./slices/app.slice";
import authSlice from "./slices/auth.slice";
import playerSlice from "./slices/player.slice";
import historySlice from "./slices/history.slice";
import { spotifyApi } from "./query/spotifyApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { rtkQueryErrorLogger } from "./middleware/logger";

export const PERSIST_KEY = "store";

const persistentReducer = persistCombineReducers(
    {
        key: PERSIST_KEY,
        storage,
        blacklist: [spotifyApi.reducerPath, appSlice.name, historySlice.name]
    },
    {
        [appSlice.name]: appSlice.reducer,
        [authSlice.name]: authSlice.reducer,
        [playerSlice.name]: playerSlice.reducer,
        [historySlice.name]: historySlice.reducer,
        [spotifyApi.reducerPath]: spotifyApi.reducer
    }
);

const store = configureStore({
    reducer: persistentReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", spotifyApi.reducerPath],
                warnAfter: 128
            },
            immutableCheck: {
                ignoredPaths: ["persist/PERSIST", spotifyApi.reducerPath],
                warnAfter: 128
            }
        }).concat(spotifyApi.middleware, rtkQueryErrorLogger),
    devTools: process.env.NODE_ENV === "development"
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
