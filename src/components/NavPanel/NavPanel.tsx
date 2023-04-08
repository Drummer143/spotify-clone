import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import PlaylistLink from "./PlaylistLink";
import LanguageButton from "./LanguageButton";
import NavigationLinks from "./NavigationLinks/NavigationLinks";
import GoogleMaterialIcon from "../GoogleMaterialIcon";
import { navBarBottomLinks } from "../../utils";
import { ReactComponent as SpotifyLogo } from "../../assets/spotifyLogo.svg";
import { useAppSelector, useGetCurrentUsersPlaylists } from "../../hooks";

import styles from "./NavPanel.module.css";

const NavPanel: React.FC = () => {
    const user = useAppSelector(state => state.auth.user);

    const [getPlaylists, playlists] = useGetCurrentUsersPlaylists();

    useEffect(() => {
        getPlaylists();
    }, []);

    return (
        <nav className={`w-[var(--nav-bar-width)] bg-black flex flex-col overflow-hidden max-h-full ${styles.wrapper}`}>
            <Link to="/" className="pt-6 px-6 mb-[1.375rem] block">
                <SpotifyLogo fill="#fff" className="max-w-[8.125rem]" />
            </Link>

            <NavigationLinks />

            {!user && (
                <div className={"text-[0.6875rem] text-[#b3b3b3] flex content-end flex-1 flex-wrap gap-x-4 px-6 my-8"
                    .concat(" scroll-smooth")}>
                    {navBarBottomLinks.map(({ to, text }) => (
                        <a
                            target="_blank"
                            key={to}
                            className="h-[1.875rem] block whitespace-nowrap"
                            href={to}
                            rel="noreferrer"
                        >
                            {text}
                        </a>
                    ))}

                    <LanguageButton />
                </div>
            )}

            {user && (
                <>
                    <hr
                        className={"bg-[#282828] mr-[var(--left-sidebar-padding-right)]"
                            .concat(" ml-[var(--left-sidebar-padding-right)] mt-2 mb-4 h-[1px]")}
                    />

                    <div
                        className={"overflow-y-auto flex-1 overflow-x-hidden"}
                    >
                        {playlists?.map(playlist => (
                            <PlaylistLink to={`/playlist/${playlist.id}`} key={playlist.id}>
                                {playlist.name}
                            </PlaylistLink>
                        ))}
                    </div>

                    <NavLink
                        to="/download"
                        className={({ isActive }) => "h-10 w-full flex items-center gap-4"
                            .concat(" pr-[var(--left-sidebar-padding-right)] pl-[var(--left-sidebar-padding-left)]")
                            .concat(" ", isActive ? "text-white" : "text-[#b3b3b3] hover:text-white")}
                    >
                        <GoogleMaterialIcon iconName="download_for_offline" className="text-inherit" size={1.6} />
                        <span className="text-inherit text-sm">Install App</span>
                    </NavLink>
                </>
            )}
        </nav>
    );
};

export default NavPanel;
