import React from "react";

import SongTimeInfo from "./SongTimeInfo";
import SongRewindSlider from "./SongRewindSlider";

const SongTimeDisplayer: React.FC = () => {
    return (
        <div className="flex gap-2 items-center justify-center mt-2">
            <SongTimeInfo>0:00</SongTimeInfo>

            <div className="w-full">
                <SongRewindSlider />
            </div>

            <SongTimeInfo>0:00</SongTimeInfo>
        </div>
    );
};

export default SongTimeDisplayer;
