import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setVolume, toggleMute } from "@/redux";

import { GoogleMaterialIcon, RangeInput } from "..";

const RightPart: React.FC = () => {
    const { volume, muted } = useAppSelector(state => state.player);

    const dispatch = useAppDispatch();

    const handleClick = (percentage: number) => {
        if (muted) {
            dispatch(toggleMute());
        }

        dispatch(setVolume(percentage));
    };

    const handleMouseMove = (percentage: number) => dispatch(setVolume(percentage));

    const handleMuteButtonClick = () => {
        dispatch(toggleMute());
    };

    return (
        <div className="w-[30%] flex items-center justify-end">
            <button
                onClick={handleMuteButtonClick}
                className={"w-8 h-8 flex justify-center items-center text-[hsla(0,0%,100%,0.7)]"
                    .concat(" hover:text-white active:text-[hsla(0,0%,100%,0.7)]")}
            >
                <GoogleMaterialIcon
                    iconName={(muted || !volume) ? "volume_mute" : (volume > 50 ? "volume_up" : "volume_down")}
                    className="text-inherit"
                    size={1.5}
                />
            </button>

            <div className="w-[var(--volume-input-width)]">
                <RangeInput
                    currentPercentage={volume}
                    onMouseDown={handleClick}
                    onMouseMove={handleMouseMove}
                    setToZero={muted}
                />
            </div>
        </div>
    );
};

export default RightPart;