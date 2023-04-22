import React from "react";
import dynamic from "next/dynamic";

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

export default dynamic(() => Promise.resolve(MiddleControls), { ssr: false });
