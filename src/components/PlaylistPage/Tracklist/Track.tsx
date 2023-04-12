import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import "moment-duration-format";

import ListingOfAuthors from "../../ListingOfAuthors";
import GoogleMaterialIcon from "../../GoogleMaterialIcon";

type TrackProps = {
    track: TrackInPlaylistInfo
    number: number
};

// eslint-disable-next-line camelcase
const Track: React.FC<TrackProps> = ({ track: { added_at, track }, number }) => {
    const [dateFormatter] = useState(new Intl.DateTimeFormat(Intl.DateTimeFormat().resolvedOptions().locale, {
        month: "short",
        day: "numeric",
        year: "numeric"
    }));

    return (
        <button
            className={"group grid grid-cols-tracklist-5 h-14 gap-4 items-center text-[#b3b3b3] px-4"
                .concat(" cursor-default rounded text-start")
                .concat(" hover:bg-[hsla(0,0%,100%,.1)]")
                .concat(" focus:bg-[hsla(0,0%,100%,.3)]")
                .concat(" max-lg:grid-cols-tracklist-4 max-md:grid-cols-tracklist-3")}
        >
            <div className="justify-self-center">
                <span className="group-hover:hidden text-[#b3b3b3]">{number}</span>
                <GoogleMaterialIcon
                    iconName="play_arrow"
                    FILL={1}
                    size={1.5}
                    className="text-[#b3b3b3] hidden leading-none group-hover:block"
                />
            </div>

            <div className="flex gap-4">
                <img src={track.album.images[2].url} className="w-10 h-10" />

                <div>
                    <Link to={`/track/${track.id}`} className="line-clamp-1 hover:underline w-fit">{track.name}</Link>

                    <ListingOfAuthors artists={track.artists} />
                </div>
            </div>

            <Link to={`/album/${track.album.id}`} className="line-clamp-1 text-inherit w-fit hover:underline">
                {track.album.name}
            </Link>

            <span className="line-clamp-1 text-inherit max-lg:hidden">{dateFormatter.format(new Date(added_at))}</span>

            <span className="text-[#b3b3b3] justify-self-end mr-8">
                {moment.utc(moment.duration(track.duration_ms, "milliseconds").asMilliseconds()).format("mm:ss").toString()}
            </span>
        </button>
    );
};

export default Track;