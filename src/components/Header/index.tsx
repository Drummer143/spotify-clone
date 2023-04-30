import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { MotionValue } from "framer-motion";

import UserMenu from "./UserMenu";
import HeaderLink from "./HeaderLink";
import Background from "./Background";
import MobileMenu from "./MobileMenu";
import PlaylistBar from "./PlaylistBar";
import SearchInput from "./SearchInput";
import CollectionButtons from "./CollectionButtons";
import HistoryNavigationButtons from "./HistoryNavigationButtons";
import { headerLinks } from "@/utils";
import { HeaderLoader, LoginButton } from "..";
import { spotifyApi, setCurrentUserInfo } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";

type HeaderProps = {
    scrollY: MotionValue<number>;
};

const Header: React.FC<HeaderProps> = ({ scrollY }) => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const isHeaderPlayButtonVisible = useAppSelector(state => state.app.isHeaderPlayButtonVisible);

    const router = useRouter();

    const dispatch = useAppDispatch();

    const [getCurrentUser, { currentData: user, isLoading }] = spotifyApi.useLazyGetCurrentUserQuery();

    useEffect(() => {
        if (accessToken) {
            getCurrentUser(accessToken);
        }
    }, [accessToken, getCurrentUser]);

    useEffect(() => {
        if (user) {
            dispatch(setCurrentUserInfo({ id: user.id, name: user.display_name }));
        }
    }, [dispatch, user]);

    if (isLoading && !accessToken) {
        return <HeaderLoader />;
    }

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

                {isHeaderPlayButtonVisible && <PlaylistBar scrollY={scrollY} />}
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
