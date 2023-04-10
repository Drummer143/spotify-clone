import React from "react";
import { Link } from "react-router-dom";

import PlayButton from "../../PlayButton";

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

                <PlayButton
                    size={3}
                    className={"absolute bottom-2 right-2 translate-y-1/2 opacity-0 duration-300"
                        .concat(" transition-[transform,_opacity,_box-shadow]")
                        .concat(" group-hover:translate-y-0 group-hover:opacity-100 group-hover:shadow-playlist-card")}
                />
            </div>

            <h3 className="font-bold text-base mb-1 truncate">{name}</h3>
            <p className="text-[#a7a7a7] text-sm line-clamp-2">{description}</p>
        </Link>
    );
};

export default PlaylistCard;
