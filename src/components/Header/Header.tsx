import React from "react";

import HeaderLink from "./HeaderLink";
import LoginButton from "./LoginButton";
import HistoryNavigationButtons from "./HistoryNavigationButtons";
import { headerLinks } from "src/utils/constants";

const Header: React.FC = () => {
    return (
        <div className={"fixed top-0 right-0 w-[calc(100%_-_var(--nav-bar-width))] h-16"
            .concat(" bg-[#00000080] flex items-center justify-between px-8")
            .concat(" max-lg:px-4")}
        >
            <HistoryNavigationButtons />

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
            </div>
        </div>
    );
};

export default Header;
