import React from "react";
import { Link } from "react-router-dom";

import GoogleMaterialIcon from "../GoogleMaterialIcon";

type PlaylistCardProps = {
    imageUrl: string;
    playlistUrl: string;
    name: string;
    description: string;
    id: string;
};

const PlaylistCard: React.FC<PlaylistCardProps> = ({ imageUrl, name, description, id }) => {
    return (
        <Link
            to={`/playlist/${id}`}
            className={"group p-4 bg-[#181818] rounded-[clamp(4px,32px_*_0.025,8px)] transition-[background-color]"
                .concat(" hover:bg-[#282828]")}
        >
            <div className="relative w-full aspect-square overflow-hidden mb-4">
                <img src={imageUrl} className="w-full aspect-square rounded-[clamp(4px,32px_*_0.025,8px)]" />

                <button
                    onClick={e => e.preventDefault()}
                    className={"bg-[#1ed760] w-12 h-12 rounded-full absolute bottom-2 opacity-0 translate-y-1/2"
                        .concat(" right-2 flex justify-center items-center transition-[transform,_opacity,_box-shadow]")
                        .concat(" duration-300 shadow-none")
                        .concat(" hover:scale-105")
                        .concat(" group-hover:translate-y-0 group-hover:opacity-100 group-hover:shadow-playlist-card")}
                >
                    <GoogleMaterialIcon iconName="play_arrow" FILL={1} size={2} className="text-black" />
                </button>
            </div>

            <h3 className="font-bold text-base mb-1 truncate">{name}</h3>
            <p className="text-[#a7a7a7] text-sm line-clamp-2">{description}</p>
        </Link>
    );
};

export default PlaylistCard;
