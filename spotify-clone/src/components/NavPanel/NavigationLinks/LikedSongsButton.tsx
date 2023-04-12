import React from "react";

import SavedSongsIcon from "@/components/SavedSongsIcon";
import NavPanelButton from "./NavPanelButton/NavPanelButton";

const LikedSongsButton: React.FC = () => {
    return (
        <NavPanelButton
            to={"/collection/tracks"}
            modalHeading="Enjoy your liked songs"
            modalMessage="Log in to see all the songs you&#8217;ve liked in one easy playlist."
        >
            <div className="w-6 h-6 ml-0.5 flex justify-center items-center liked-songs-icon mr-1">
                <SavedSongsIcon
                    className={"fill-[#d3d3d3] transition-[fill] duration-300".concat(" group-hover:fill-white")}
                />
            </div>
            Liked songs
        </NavPanelButton>
    );
};

export default LikedSongsButton;
