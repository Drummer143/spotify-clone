import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { MotionValue } from "framer-motion";

import UserMenu from "./UserMenu/UserMenu";
import HeaderLink from "./HeaderLink";
import Background from "./Background";
import MobileMenu from "./MobileMenu/MobileMenu";
import PlaylistBar from "./PlaylistBar";
import SearchInput from "./SearchInput";
import LoginButton from "../LoginButton";
import CollectionButtons from "./CollectionButtons";
import HistoryNavigationButtons from "./HistoryNavigationButtons";
import { spotifyApi } from "@/redux";
import { headerLinks } from "@/utils";
import { useAppSelector } from "@/hooks";

type HeaderProps = {
    scrollY: MotionValue<number>;
};

const pathWhenPlayButtonVisible = ["v1/playlist/", "/collection"];

const Header: React.FC<HeaderProps> = ({ scrollY }) => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const router = useRouter();

    const [getCurrentUser, { currentData: user }] = spotifyApi.useLazyGetCurrentUserQuery();

    useEffect(() => {
        if (accessToken) {
            getCurrentUser(accessToken);
        }
    }, [accessToken, getCurrentUser]);

    return (
        <header
            className={"fixed top-0 right-0 z-[2] w-[calc(100%_-_var(--nav-bar-width))] h-16"
                .concat(" flex items-center justify-between px-8 transition-[bg-color] duration-500")
                .concat(user ? "" : " bg-[#00000080]")
                .concat(" max-lg:px-4")}
        >
            <Background scrollY={scrollY} />

            <div className="flex items-center gap-4 flex-grow">
                <HistoryNavigationButtons />

                {pathWhenPlayButtonVisible.some(path => router.pathname.includes(path)) && (
                    <PlaylistBar scrollY={scrollY} />
                )}
                {router.pathname.includes("search") && <SearchInput />}
                {router.pathname.includes("collection") && !router.pathname.includes("track") && <CollectionButtons />}
            </div>

            {!user && (
                <div className="flex gap-4 items-center">
                    <div className="flex gap-4 items-center max-[900px]:hidden">
                        {headerLinks.map(({ text, to }) => (
                            <HeaderLink key={to} href={to}>
                                {text}
                            </HeaderLink>
                        ))}

                        <div className="h-8 w-[1px] bg-white mx-4"></div>
                    </div>

                    <HeaderLink href="https://www.spotify.com/signup">Sign Up</HeaderLink>
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
        </header>
    );
};

export default Header;
