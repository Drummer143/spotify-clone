import React from "react";

import NavPanelLink from "./NavPanelLink";
import NavPanelButton from "./NavPanelButton/NavPanelButton";
import GoogleMaterialIcon from "../../GoogleMaterialIcon";
import { ReactComponent as LikedSongIcon } from "../../../assets/likedSongs.svg";

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

            <div>
                <NavPanelButton
                    modalHeading="Create playlist"
                    modalMessage="Log in to create and share playlists."
                    leftItem={<GoogleMaterialIcon iconName="add_box" FILL={1} size={1.8} />}
                    className="mt-6"
                >
                    Create playlist
                </NavPanelButton>

                <NavPanelButton
                    modalHeading="Enjoy your liked songs"
                    modalMessage="Log in to see all the songs you&#8217;ve liked in one easy playlist."
                    leftItem={
                        <div className="w-6 h-6 ml-0.5 flex justify-center items-center liked-songs-icon mr-1">
                            <LikedSongIcon
                                className={"fill-[#d3d3d3] transition-[fill] duration-300"
                                    .concat(" group-hover:fill-white")}
                            />
                        </div>
                    }
                >
                    Liked songs
                </NavPanelButton>
            </div>
        </>
    );
};

export default NavigationLinks;
