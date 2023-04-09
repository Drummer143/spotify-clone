import React from "react";

import UserMenu from "./UserMenu/UserMenu";
import HeaderLink from "./HeaderLink";
import MobileMenu from "./MobileMenu/MobileMenu";
import LoginButton from "../LoginButton";
import HistoryNavigationButtons from "./HistoryNavigationButtons";
import { headerLinks } from "../../utils";
import { useAppSelector } from "../../hooks";

const Header: React.FC = () => {
    const user = useAppSelector(state => state.auth.user);

    return (
        <div
            className={"fixed top-0 right-0 w-[calc(100%_-_var(--nav-bar-width))] h-16"
                .concat(" flex items-center justify-between px-8")
                .concat(user ? "" : " bg-[#00000080]")
                .concat(" max-lg:px-4")}
        >
            <HistoryNavigationButtons />

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
        </div>
    );
};

export default Header;
