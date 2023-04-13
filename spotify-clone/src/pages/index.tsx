import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import MainPage from "@/components/MainPage/MainPage";
import LoginButton from "@/components/LoginButton";
import { changeHeadBGColor, setTitle } from "@/redux";
import { useAppSelector, useAppDispatch } from "@/hooks";

const MainPageWrapper: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(changeHeadBGColor(accessToken ? "authentificated" : "nonAuthentificated"));
        dispatch(setTitle());
    }, [accessToken, dispatch]);

    useEffect(() => {
        if (!accessToken) {
            router.push({ pathname: "/login" })
        }
    }, [accessToken, router])

    return (
        <Layout>
            <MainPage />
        </Layout>
    );
};

export default MainPageWrapper;
