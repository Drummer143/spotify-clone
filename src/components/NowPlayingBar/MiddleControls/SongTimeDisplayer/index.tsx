import React from "react";

import SongTimeInfo from "./SongTimeInfo";
import { RangeInput } from "@/components";
import { useAppSelector } from "@/hooks";
import moment from "moment";

const SongTimeDisplayer: React.FC = () => {
    const { currentPlayTime, currentSongDuration } = useAppSelector(state => state.player);

    return (
        <div className="flex gap-2 items-center justify-center mt-2">
            <SongTimeInfo side="left">
                {moment.duration({ seconds: currentPlayTime }).format("mm:ss", { trim: false })}
            </SongTimeInfo>

            <div className="w-full">
                <RangeInput
                    currentPercentage={currentPlayTime / currentSongDuration}
                />
            </div>

            <SongTimeInfo side="right">
                {moment.duration({ seconds: currentSongDuration }).format("mm:ss", { trim: false })}
            </SongTimeInfo>
        </div>
    );
};

export default SongTimeDisplayer;
