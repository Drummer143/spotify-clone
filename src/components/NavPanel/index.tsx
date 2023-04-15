import React from "react";
import Link from "next/link";

import SpotifyLogo from "../SpotifyLogo";
import UsersPlaylists from "./UsersPlaylists";
import NavigationLinks from "./NavigationLinks";

import styles from "@/styles/NavPanel.module.css";

const NavPanel: React.FC = () => {
    return (
        <nav className={`w-[var(--nav-bar-width)] bg-black flex flex-col overflow-hidden max-h-full ${styles.wrapper}`}>
            <Link href="/" className="pt-6 px-6 mb-[1.375rem] block">
                <SpotifyLogo fill="#fff" className="max-w-[8.125rem]" />
            </Link>

            <NavigationLinks />

            <UsersPlaylists />
        </nav>
    );
};

export default NavPanel;
