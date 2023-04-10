import React, { useEffect } from "react";

import MainPage from "./MainPage/MainPage";
import LoginButton from "../LoginButton";
import { changeHeadBGColor, setTitle } from "../../redux/slices/appState";
import { useAppDispatch, useAppSelector } from "../../hooks";

const MainPageWrapper: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeHeadBGColor(accessToken ? "authentificated" : "nonAuthentificated"));
        dispatch(setTitle());
    }, []);

    if (!accessToken) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center gap-10">
                <p className="text-xl">Log in to Spotify listen music</p>
                <LoginButton />
            </div>
        );
    }

    return <MainPage />;
};

export default MainPageWrapper;
