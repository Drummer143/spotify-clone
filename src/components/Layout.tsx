import Head from "next/head";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useScroll } from "framer-motion";

import Loader from "./Loader";
import Header from "./Header/Header";
import NavPanel from "./NavPanel/NavPanel";
import NowPlayingBar from "./NowPlayingBar/NowPlayingBar";
import ResizeDetector from "./ResizeDetector";

import styles from "@/styles/Layout.module.css";

type LayoutProps = {
    title?: string
    isLoading?: boolean
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children, isLoading = false, title = "Spotify Clone" }) => {
    const scrollRef = useRef<HTMLElement>(null);
    const { pathname } = useRouter();

    const { scrollY } = useScroll({ container: scrollRef });

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <div className={`relative w-full h-screen min-w-[50rem] grid ${styles.wrapper}`}>
                <NavPanel />

                <Header scrollY={scrollY} />

                <main
                    ref={scrollRef}
                    className={"h-full relative w-full bg-[#121212] overflow-y-auto overflow-x-hidden".concat(" ", styles.main)}
                >
                    <ResizeDetector />
                    {isLoading ? (
                        <Loader />
                    ) : children}
                </main>

                <NowPlayingBar />
            </div>
        </>
    );
};

export default Layout;
