import React from "react";

import ControlsButton from "./ControlsButton";
import { GoogleMaterialIcon } from "@/components";
import { toggleShuffle, toggleRepeat, setPaused, setCurrentSongIndex } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";

const PlaylistControls: React.FC = () => {
    const { repeat, shuffle, paused } = useAppSelector(state => state.player);

    const dispatch = useAppDispatch();

    const togglePaused = () => dispatch(setPaused());

    const nextTrack = () => dispatch(setCurrentSongIndex("next"));

    const prevTrack = () => dispatch(setCurrentSongIndex("prev"));

    return (
        <div className="w-full flex justify-center gap-2 items-center text-[hsla(0,0%,100%,.7)]">
            <ControlsButton active={shuffle} onClick={() => dispatch(toggleShuffle())}>
                <GoogleMaterialIcon iconName="shuffle" className="text-inherit" wght={700} size={1.4} />
            </ControlsButton>

            <ControlsButton onClick={prevTrack}>
                <GoogleMaterialIcon iconName="skip_previous" className="text-inherit" FILL={1} wght={700} size={1.6} />
            </ControlsButton>

            <ControlsButton
                className="bg-white rounded-full mx-2 hover:scale-105 active:scale-95"
                onClick={togglePaused}
            >
                <GoogleMaterialIcon
                    iconName={paused ? "play_arrow" : "pause"}
                    className="text-[#181818]"
                    FILL={1}
                    size={1.7}
                />
            </ControlsButton>

            <ControlsButton onClick={nextTrack}>
                <GoogleMaterialIcon iconName="skip_next" className="text-inherit" FILL={1} wght={700} size={1.6} />
            </ControlsButton>

            <ControlsButton active={repeat !== "no"} onClick={() => dispatch(toggleRepeat())}>
                <GoogleMaterialIcon
                    iconName={repeat === "single" ? "repeat_one" : "repeat"}
                    className="text-inherit"
                    wght={700}
                    size={1.4}
                />
            </ControlsButton>
        </div>
    );
};

export default PlaylistControls;
