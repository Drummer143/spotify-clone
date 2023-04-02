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

            <main className={`flex flex-col bg-slate-600 max-h-full ${styles.main}`}>
                <div
                    className={"px-6 overflow-y-auto scrollbar-hidden flex flex-col-reverse"
                        .concat(" xl:flex-row")}
                >
                    <div className="flex-1 h-fit pb-40">
                        <Outlet />
                    </div>
                </div>
            </main>

            <NowPlayingBar />
        </div>
    );
};

export default Layout;