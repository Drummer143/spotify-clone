import React from "react";

import ControlsButton from "./ControlsButton";
import GoogleMaterialIcon from "../../../GoogleMaterialIcon";
import { toggleShuffle, toggleRepeat } from "../../../../redux";
import { useAppDispatch, useAppSelector } from "../../../../hooks";

const PlaylistControls: React.FC = () => {
    const dispatch = useAppDispatch();
    const { repeat, shuffle } = useAppSelector(state => state.player);

    return (
        <div className="w-full flex justify-center gap-2 items-center text-[hsla(0,0%,100%,.7)]">
            <ControlsButton
                active={shuffle}
                onClick={() => dispatch(toggleShuffle())}
            >
                <GoogleMaterialIcon
                    iconName="shuffle"
                    className="text-inherit"
                    wght={700}
                    size={1.4}
                />
            </ControlsButton>

            <ControlsButton>
                <GoogleMaterialIcon
                    iconName="skip_previous"
                    className="text-inherit"
                    FILL={1}
                    wght={700} size
                    ={1.6}
                />
            </ControlsButton>

            <ControlsButton className="bg-white rounded-full mx-2 hover:scale-105 active:scale-95">
                <GoogleMaterialIcon
                    iconName="play_arrow"
                    className="text-[#181818]"
                    FILL={1}
                    size={1.7}
                />
            </ControlsButton>

            <ControlsButton>
                <GoogleMaterialIcon
                    iconName="skip_next"
                    className="text-inherit"
                    FILL={1}
                    wght={700} size
                    ={1.6}
                />
            </ControlsButton>

            <ControlsButton
                active={repeat !== "no"}
                onClick={() => dispatch(toggleRepeat())}
            >
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