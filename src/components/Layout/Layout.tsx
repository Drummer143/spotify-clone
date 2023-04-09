import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import NowPlayingBar from "../NowPlayingBar/NowPlayingBar";
import NavPanel from "../NavPanel/NavPanel";

import styles from "./Layout.module.css";

const Layout: React.FC = () => {
    return (
        <div className={`relative grid w-screen h-screen ${styles.wrapper}`}>
            <NavPanel />

            <Header />

            <main className={`h-full w-full bg-[#121212] overflow-hidden ${styles.main}`}>
                <Outlet />
            </main>

            <NowPlayingBar />
        </div>
    );
};

export default Layout;
