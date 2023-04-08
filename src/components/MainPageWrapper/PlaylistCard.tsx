import React from "react";

import GoogleMaterialIcon from "../GoogleMaterialIcon";

type PlaylistCardProps = {
    imageUrl: string
    playlistUrl: string
    name: string
    description: string
};

const PlaylistCard: React.FC<PlaylistCardProps> = ({ imageUrl, name, playlistUrl, description }) => {

    return (
        <div
            className={"group p-4 w-[154px] h-[245px] bg-[#181818] rounded-[clamp(4px,32px_*_0.025,8px)]"
                .concat(" transition-[background-color] cursor-pointer")
                .concat(" hover:bg-[#282828]")}
        >
            <div className="relative w-full aspect-square overflow-hidden mb-4">
                <img src={imageUrl} className="w-full aspect-square rounded-[clamp(4px,32px_*_0.025,8px)]" />

                <button
                    className={"bg-[#1ed760] w-12 h-12 rounded-full absolute bottom-2 opacity-0 translate-y-full"
                        .concat(" right-2 flex justify-center items-center transition-[transform,_opacity]")
                        .concat(" duration-300")
                        .concat(" hover:scale-105")
                        .concat(" group-hover:translate-y-0 group-hover:opacity-100")}
                >
                    <GoogleMaterialIcon iconName="play_arrow" FILL={1} size={2} className="text-black" />
                </button>
            </div>

            <h3 className="font-bold text-base mb-1 truncate">{name}</h3>
            <p className="text-ellipsis text-[#a7a7a7] text-sm truncate whitespace-normal">{description}</p>
        </div>
    );
};

export default PlaylistCard;