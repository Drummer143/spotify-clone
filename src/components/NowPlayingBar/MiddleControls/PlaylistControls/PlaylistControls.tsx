import React from "react";

import ControlsButton from "./ControlsButton";
import GoogleMaterialIcon from "src/components/GoogleMaterialIcon";

const PlaylistControls: React.FC = () => {

    return (
        <div className="w-full flex justify-center gap-2 items-center text-[hsla(0,0%,100%,.7)]">
            <ControlsButton>
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
                    className="text-transparent text-[#181818]"
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

            <ControlsButton>
                <GoogleMaterialIcon
                    iconName="repeat"
                    className="text-inherit"
                    wght={700}
                    size={1.4}
                />
            </ControlsButton>
        </div>
    );
};

export default PlaylistControls;