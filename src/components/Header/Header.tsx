import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MotionValue, motion, useTransform } from "framer-motion";

import UserMenu from "./UserMenu/UserMenu";
import HeaderLink from "./HeaderLink";
import MobileMenu from "./MobileMenu/MobileMenu";
import PlaylistBar from "./PlaylistBar";
import LoginButton from "../LoginButton";
import HistoryNavigationButtons from "./HistoryNavigationButtons";
import { spotifyApi } from "../../redux/query/spotifyApi";
import { useAppSelector } from "../../hooks";
import { getDarkenColor, headerLinks } from "../../utils";

type HeaderProps = {
    scrollY: MotionValue<number>
}

const Header: React.FC<HeaderProps> = ({ scrollY }) => {
    const bgColors = useAppSelector(state => state.app.headerBGColor);
    const isPlaylistPage = useLocation().pathname.includes("playlist");

    const [BGTransitionOffsetY] = useState([10, 150]);

    const bgColor = useTransform(scrollY, BGTransitionOffsetY, [bgColors[0], getDarkenColor(bgColors[1])]);

    const accessToken = useAppSelector(state => state.auth.accessToken);

    const { currentData: user } = spotifyApi.useGetCurrentUserQuery(accessToken || "", {
        skip: !accessToken,
        refetchOnMountOrArgChange: true
    });

    return (
        <motion.header
            className={"fixed top-0 right-0 z-[1] w-[calc(100%_-_var(--nav-bar-width))] h-16"
                .concat(" flex items-center justify-between px-8 transition-[bg-color] duration-500")
                .concat(user ? "" : " bg-[#00000080]")
                .concat(" max-lg:px-4")}
            style={{
                backgroundColor: bgColor
            }}
        >
            <div className="flex items-center gap-4">
                <HistoryNavigationButtons />

                {isPlaylistPage && <PlaylistBar scrollY={scrollY} />}
            </div>

            {!user && (
                <div className="flex gap-4 items-center">
                    <div className="flex gap-4 items-center max-[900px]:hidden">
                        {headerLinks.map(({ text, to }) => (
                            <HeaderLink key={to} to={to}>
                                {text}
                            </HeaderLink>
                        ))}

                        <div className="h-8 w-[1px] bg-white mx-4"></div>
                    </div>

                    <HeaderLink to="https://www.spotify.com/signup">Sign Up</HeaderLink>
                    <LoginButton />

                    <MobileMenu />
                </div>
            )}

            {user && (
                <div className="flex gap-4 items-center">
                    <a
                        href="https://www.spotify.com/premium"
                        title="Upgrade to Premium"
                        className={"w-[5.5rem] h-8 border border-solid border-[#878787] leading-8 font-semibold block"
                            .concat(" text-white rounded-full text-sm flex justify-center items-center")
                            .concat(" transition-[transform,_border-width]")
                            .concat(" max-lg:hidden")
                            .concat(" hover:scale-105 hover:border-white")}
                    >
                        {" "}
                        Upgrade
                    </a>

                    <UserMenu user={user} />
                </div>
            )}
        </motion.header>
    );
};

export default Header;
