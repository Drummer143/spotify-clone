import React from "react";

import NavPanelButton from "./NavPanelButton";
import { GoogleMaterialIcon } from "@/components";

const CreatePlaylistButton: React.FC = () => {
    return (
        <NavPanelButton
            to="/playlist/032rjtT6crXLvyiGtzVcHu"
            modalHeading="Create playlist"
            modalMessage="Log in to create and share playlists."
        >
            <GoogleMaterialIcon iconName="add_box" className="text-inherit fill-current" FILL={1} size={1.8} />
            <span className="text-inherit">Create playlist</span>
        </NavPanelButton>
    );
};

export default CreatePlaylistButton;
