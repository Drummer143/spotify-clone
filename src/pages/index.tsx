import React, { useEffect } from "react";

import MainPage from "@/components/MainPage/MainPage";
import { changeHeadBGColor } from "@/redux";
import { useAppSelector, useAppDispatch } from "@/hooks";

const MainPageWrapper: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeHeadBGColor(accessToken ? "authentificated" : "nonAuthentificated"));
    }, [accessToken, dispatch]);

    return <MainPage />;
};

export default MainPageWrapper;
