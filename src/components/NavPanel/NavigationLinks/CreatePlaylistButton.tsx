import React from "react";

import NavPanelButton from "./NavPanelButton/NavPanelButton";
import GoogleMaterialIcon from "@/components/GoogleMaterialIcon";

const CreatePlaylistButton: React.FC = () => {
    return (
        <NavPanelButton
            to="/playlist/032rjtT6crXLvyiGtzVcHu"
            modalHeading="Create playlist"
            modalMessage="Log in to create and share playlists."
        >
            <GoogleMaterialIcon iconName="add_box" FILL={1} size={1.8} />
            <span>Create playlist</span>
        </NavPanelButton>
    );
};

export default CreatePlaylistButton;
