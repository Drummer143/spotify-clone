import React from "react";

import GoogleMaterialIcon from "./GoogleMaterialIcon";

type PlayButtonProps = {
    size?: number;

    className?: string;
};

const PlayButton: React.FC<PlayButtonProps> = ({ size = 3.5, className }) => {
    return (
        <button
            style={{
                width: `${size}rem`
            }}
            className={"aspect-square rounded-full bg-[#1ed760] transition-[transform,_background-color]"
                .concat(" flex items-center justify-center")
                .concat(className ? ` ${className}` : "")
                .concat(" hover:scale-105 active:bg-[#169c46] active:scale-100")}
        >
            <GoogleMaterialIcon iconName="play_arrow" FILL={1} size={(2.2 * size) / 3.5} className="text-black" />
        </button>
    );
};

export default PlayButton;
