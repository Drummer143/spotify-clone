import React from "react";

import PlaylistControls from "./PlaylistControls";
import SongTimeDisplayer from "./SongTimeDisplayer";

const MiddleControls: React.FC = () => {
    return (
        <div className="max-w-[45.125rem] w-[40%]">
            <PlaylistControls />
            <SongTimeDisplayer />
        </div>
    );
};

export default MiddleControls;
