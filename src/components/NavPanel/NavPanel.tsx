import React from "react";
import { Link } from "react-router-dom";

import UsersPlaylists from "./UsersPlaylists";
import NavigationLinks from "./NavigationLinks/NavigationLinks";
import { ReactComponent as SpotifyLogo } from "../../assets/spotifyLogo.svg";

import styles from "./NavPanel.module.css";

const NavPanel: React.FC = () => {
    return (
        <nav className={`w-[var(--nav-bar-width)] bg-black flex flex-col overflow-hidden max-h-full ${styles.wrapper}`}>
            <Link to="/" className="pt-6 px-6 mb-[1.375rem] block">
                <SpotifyLogo fill="#fff" className="max-w-[8.125rem]" />
            </Link>

            <NavigationLinks />

            <UsersPlaylists />
        </nav>
    );
};

export default NavPanel;
