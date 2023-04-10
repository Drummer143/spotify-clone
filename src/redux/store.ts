import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers, persistStore } from "redux-persist";

import appSlice from "./slices/appState";
import authSlice from "./slices/authSlice";
import playerSlice from "./slices/playerSlice";
import { spotifyApi } from "./query/spotifyApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const persistentReducer = persistCombineReducers(
    {
        key: "store",
        storage
    },
    {
        app: appSlice.reducer,
        auth: authSlice.reducer,
        player: playerSlice.reducer,
        [spotifyApi.reducerPath]: spotifyApi.reducer
    }
);

const store = configureStore({
    reducer: persistentReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(spotifyApi.middleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
