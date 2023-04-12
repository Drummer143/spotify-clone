import React, { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import NavPanel from "../NavPanel/NavPanel";
import NowPlayingBar from "../NowPlayingBar/NowPlayingBar";

import styles from "./Layout.module.css";

const Layout: React.FC = () => {
    const scrollRef = useRef<HTMLElement>(null);
    const location = useLocation();

    const { scrollY } = useScroll({ container: scrollRef });

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    return (
        <div className={`relative w-full h-screen min-w-[50rem] grid ${styles.wrapper}`}>
            <NavPanel />

            <Header scrollY={scrollY} />

            <main
                ref={scrollRef}
                className={"h-full w-full bg-[#121212] overflow-y-auto overflow-x-hidden".concat(" ", styles.main)}
            >
                <Outlet />
            </main>

            <NowPlayingBar />
        </div>
    );
};

export default Layout;
