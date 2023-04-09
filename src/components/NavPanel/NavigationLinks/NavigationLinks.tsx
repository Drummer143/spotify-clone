import React from "react";

import NavPanelLink from "./NavPanelLink";
import NavPanelButton from "./NavPanelButton/NavPanelButton";
import GoogleMaterialIcon from "../../GoogleMaterialIcon";
import LikedSongsButton from "./LikedSongsButton";
import CreatePlaylistButton from "./CreatePlaylistButton";

const NavigationLinks: React.FC = () => {
    return (
        <>
            <div>
                <NavPanelLink to="/" iconName="home">
                    Home
                </NavPanelLink>
                <NavPanelLink to="/search" iconName="search">
                    Search
                </NavPanelLink>
                <NavPanelLink to="/collection" iconName="list">
                    Your Library
                </NavPanelLink>
            </div>

            <div className="mt-6">
                <CreatePlaylistButton />

                <LikedSongsButton />
            </div>
        </>
    );
};

export default NavigationLinks;
