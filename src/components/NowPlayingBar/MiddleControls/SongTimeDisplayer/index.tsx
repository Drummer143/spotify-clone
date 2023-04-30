import React, { useRef } from "react";
import moment from "moment";

import SongTimeInfo from "./SongTimeInfo";
import { RangeInput } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentPlayTime, setPaused } from "@/redux";

const SongTimeDisplayer: React.FC = () => {
    const { currentPlayTime, currentSongDuration, paused } = useAppSelector(state => state.player);

    const isPausedBeforeRewind = useRef(false);

    const dispatch = useAppDispatch();

    const handleRangeMouseDown = () => {
        isPausedBeforeRewind.current = paused;

        dispatch(setPaused(true));
    };

    const handleRangeMouseUp = (percentage: number) => {
        dispatch(setCurrentPlayTime(percentage * currentSongDuration));

        if (!isPausedBeforeRewind.current) {
            queueMicrotask(() => dispatch(setPaused(false)));
        }
    };

    return (
        <div className="flex gap-2 items-center justify-center mt-2">
            <SongTimeInfo side="left">
                {moment.duration({ seconds: currentPlayTime }).format("mm:ss", { trim: false })}
            </SongTimeInfo>

            <div className="w-full">
                <RangeInput
                    onMouseDown={handleRangeMouseDown}
                    // onMouseMove={handleRangeMouseMove}
                    onMouseUp={handleRangeMouseUp}
                    currentPercentage={currentSongDuration === 0 ? 0 : currentPlayTime / currentSongDuration}
                    disabled={!currentSongDuration}
                />
            </div>

            <SongTimeInfo side="right">
                {moment.duration({ seconds: currentSongDuration }).format("mm:ss", { trim: false })}
            </SongTimeInfo>
        </div>
    );
};

export default SongTimeDisplayer;
