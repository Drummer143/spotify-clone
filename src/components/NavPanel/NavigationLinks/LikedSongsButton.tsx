import React from "react";

import NavPanelButton from "./NavPanelButton";
import { SavedSongsIcon } from "@/components";

const LikedSongsButton: React.FC = () => {
    return (
        <NavPanelButton
            to="/collection/tracks"
            modalHeading="Enjoy your liked songs"
            modalMessage="Log in to see all the songs you&#8217;ve liked in one easy playlist."
        >
            <div className="w-6 h-6 ml-0.5 flex justify-center items-center text-inherit liked-songs-icon mr-1">
                <SavedSongsIcon className={"text-inherit fill-current"} />
            </div>
            Liked songs
        </NavPanelButton>
    );
};

export default LikedSongsButton;
