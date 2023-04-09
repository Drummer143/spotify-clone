import React from "react";

import { useAppSelector } from "../../../hooks";
import GoogleMaterialIcon from "../../GoogleMaterialIcon";
import NavPanelButton from "./NavPanelButton/NavPanelButton";
import { NavLink } from "react-router-dom";

const CreatePlaylistButton: React.FC = () => {
    const isAuthenticated = useAppSelector(state => !!state.auth.accessToken);

    if (isAuthenticated) {
        // TODO:
        return (
            <NavLink
                to="https://open.spotify.com/playlist/032rjtT6crXLvyiGtzVcHu"
                className={({ isActive }) =>
                    "group flex items-center gap-4 h-10 w-full px-4 text-sm font-bold"
                        .concat(" transition-[color] leading-4 duration-300")
                        .concat(" ", isActive ? "text-white" : "text-[#d3d3d3] hover:text-white")}
            >
                <GoogleMaterialIcon iconName="add_box" FILL={1} size={1.8} />
                Create playlist
            </NavLink>
        );
    }

    return (
        <NavPanelButton
            modalHeading="Create playlist"
            modalMessage="Log in to create and share playlists."
        >
            <GoogleMaterialIcon iconName="add_box" FILL={1} size={1.8} />
            Create playlist
        </NavPanelButton>
    );
};

export default CreatePlaylistButton;