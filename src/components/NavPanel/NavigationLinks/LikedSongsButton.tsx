import React from "react";
import { NavLink } from "react-router-dom";

import NavPanelButton from "./NavPanelButton/NavPanelButton";
import { useAppSelector } from "../../../hooks";
import { ReactComponent as LikedSongIcon } from "../../../assets/likedSongs.svg";

const LikedSongsButton: React.FC = () => {
    const isAuthenticated = useAppSelector(state => !!state.auth.accessToken);

    if (isAuthenticated) {
        return (
            <NavLink
                to="/collection/tracks"
                className={({ isActive }) =>
                    "group flex items-center gap-4 h-10 w-full px-4 text-sm font-bold"
                        .concat(" transition-[color] leading-4 duration-300")
                        .concat(" ", isActive ? "text-white" : "text-[#d3d3d3] hover:text-white")}
            >
                {({ isActive }) => (
                    <>
                        <div className="w-6 h-6 ml-0.5 flex justify-center items-center liked-songs-icon mr-1">
                            <LikedSongIcon
                                className={"transition-[fill] duration-300"
                                    .concat(" ", isActive ? "fill-white" : "group-hover:fill-white fill-[#d3d3d3]")}
                            />
                        </div>
                        Liked songs
                    </>
                )}
            </NavLink>
        );
    }

    return (
        <NavPanelButton
            modalHeading="Enjoy your liked songs"
            modalMessage="Log in to see all the songs you&#8217;ve liked in one easy playlist."
        >
            <div className="w-6 h-6 ml-0.5 flex justify-center items-center liked-songs-icon mr-1">
                <LikedSongIcon
                    className={"fill-[#d3d3d3] transition-[fill] duration-300"
                        .concat(" group-hover:fill-white")}
                />
            </div>
            Liked songs
        </NavPanelButton>
    );
};

export default LikedSongsButton;