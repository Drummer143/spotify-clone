import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers, persistStore } from "redux-persist";

import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";

const persistentReducer = persistCombineReducers({
    key: "store",
    storage
}, {
    auth: authSlice.reducer,
    user: userSlice.reducer
});

const store = configureStore({
    reducer: persistentReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;