import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

import NavPanelButton from "./NavPanelButton/NavPanelButton";
import GoogleMaterialIcon from "@/components/GoogleMaterialIcon";
import { useAppSelector } from "@/hooks";

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
