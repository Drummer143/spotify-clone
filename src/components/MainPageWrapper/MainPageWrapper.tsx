import React from "react";

import MainPage from "./MainPage";
import LoginButton from "../LoginButton";
import { useAppSelector } from "../../hooks";

const MainPageWrapper: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    if (!accessToken) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center gap-10">
                <p className="text-xl">Log in to Spotify listen music</p>
                <LoginButton />
            </div>
        );
    }

    return (
        <MainPage />
    );
};

export default MainPageWrapper;