import React from "react";

import NavPanelLink from "./NavPanelLink";
import LikedSongsButton from "./LikedSongsButton";
import CreatePlaylistButton from "./CreatePlaylistButton";

const NavigationLinks: React.FC = () => {
    return (
        <>
            <div>
                <NavPanelLink href="/" iconName="home">
                    Home
                </NavPanelLink>
                <NavPanelLink href="/search" iconName="search">
                    Search
                </NavPanelLink>
                <NavPanelLink href="/collection/playlists" iconName="list">
                    Your Library
                </NavPanelLink>
            </div>

            <section className="mt-6">
                <CreatePlaylistButton />

                <LikedSongsButton />
            </section>
        </>
    );
};

export default NavigationLinks;
