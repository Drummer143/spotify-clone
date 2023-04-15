import Image from "next/image";
import React from "react";
import moment from "moment";

import ListingOfAuthors from "../ListingOfAuthors";
import GoogleMaterialIcon from "../GoogleMaterialIcon";

type SongCardProps = {
    song: TrackInfo;
};

const SongCard: React.FC<SongCardProps> = ({ song }) => {
    return (
        <button
            className={"group flex items-center gap-4 p-2 w-full rounded text-start cursor-default"
                .concat(" hover:bg-[hsla(0,0%,100%,.1)] focus:bg-[hsla(0,0%,100%,.3)]")}
        >
            <div className="relative">
                <Image
                    width={40}
                    height={40}
                    alt="song cover"
                    className="h-10 w-10"
                    src={`/api/image_proxy?uri=${song.album.images[0].url}`}
                />

                <div
                    className={"absolute top-0 left-0 w-full h-full items-center justify-center"
                        .concat(" hidden bg-[rgba(0,0,0,.5)] cursor-pointer")
                        .concat(" group-hover:flex")}
                >
                    <GoogleMaterialIcon iconName="play_arrow" FILL={1} size={1.5} />
                </div>
            </div>

            <div className="flex-1">
                <p className="text-base line-clamp-1">{song.name}</p>
                <ListingOfAuthors artists={song.artists} />
            </div>

            <span className="cursor-default text-sm text-[#b3b3b3]">
                {moment.utc(moment.duration(song.duration_ms).asMilliseconds()).format("mm:ss")}
            </span>
        </button>
    );
};

export default SongCard;
