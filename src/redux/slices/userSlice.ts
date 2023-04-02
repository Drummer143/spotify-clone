import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserState {
    user?: User
}

export const getUser = () => createAsyncThunk(
    "user/getUser",
    async () => {
        console.log("asdasdas"); 
    }
);

const initialState: UserState = {};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;
