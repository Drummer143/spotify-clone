import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useScroll } from "framer-motion";

import { Header, NavPanel, NowPlayingBar, ResizeDetector } from "..";

import styles from "@/styles/Layout.module.css";

type LayoutProps = {
    children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const scrollRef = useRef<HTMLElement>(null);
    const { pathname } = useRouter();

    const { scrollY } = useScroll({ container: scrollRef });

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return (
        <div className={`relative w-full h-screen min-w-[50rem] grid ${styles.wrapper}`}>
            <NavPanel />

            <Header scrollY={scrollY} />

            <main
                ref={scrollRef}
                className={"h-full relative w-full bg-[#121212] overflow-y-auto overflow-x-hidden".concat(
                    " ",
                    styles.main
                )}
            >
                <ResizeDetector />

                {children}

                <div className="pt-content-spacing"></div>
            </main>

            <NowPlayingBar />
        </div>
    );
};

export default Layout;
