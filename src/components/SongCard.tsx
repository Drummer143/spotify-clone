import Link from "next/link";
import React, { useState } from "react";
import moment from "moment";

import "moment-duration-format";

import ListingOfAuthors from "./ListingOfAuthors";
import GoogleMaterialIcon from "./GoogleMaterialIcon";
import Image from "next/image";

type SongCardProps = {
    imageURL: string;
    songId: string;
    duration: number;
    artists: ShortArtistInfo[];
    name: string;

    number?: number;
    albumId?: string;
    albumName?: string;
    dateAdded?: string;
};

// eslint-disable-next-line camelcase
const SongCard: React.FC<SongCardProps> = ({
    number,
    imageURL,
    songId,
    name,
    artists,
    albumId,
    albumName,
    dateAdded,
    duration
}) => {
    const [countOfHiddenFields] = useState([!number, !(albumId && albumName), !dateAdded].filter(f => f).length);
    const [dateFormatter] = useState(
        new Intl.DateTimeFormat(Intl.DateTimeFormat().resolvedOptions().locale, {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
    );

    return (
        <button
            className={"group grid h-14 gap-4 items-center text-[#b3b3b3] px-4 cursor-default rounded text-start"
                .concat(" hover:bg-[hsla(0,0%,100%,.1)]")
                .concat(" focus:bg-[hsla(0,0%,100%,.3)]")
                .concat(
                    countOfHiddenFields === 0
                        ? " grid-cols-tracklist-5 max-lg:grid-cols-tracklist-4 max-md:grid-cols-tracklist-3"
                        : ""
                )
                .concat(countOfHiddenFields === 1 ? " grid-cols-tracklist-4 max-md:grid-cols-tracklist-3" : "")
                .concat(countOfHiddenFields === 2 ? " grid-cols-tracklist-3" : "")
                .concat(countOfHiddenFields === 3 ? " grid-cols-tracklist-2" : "")}
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
                <Image
                    width={200}
                    height={200}
                    alt="album cover"
                    src={`/api/image_proxy?uri=${imageURL}`}
                    className="w-10 h-10"
                />

                <div>
                    <Link href={`/track/${songId}`} className="line-clamp-1 hover:underline w-fit">
                        {name}
                    </Link>

                    <ListingOfAuthors artists={artists} />
                </div>
            </div>

            <Link href={`/album/${albumId}`} className="line-clamp-1 text-inherit w-fit hover:underline">
                {albumName}
            </Link>

            {dateAdded && (
                <span className="line-clamp-1 text-inherit max-lg:hidden">
                    {dateFormatter.format(new Date(dateAdded))}
                </span>
            )}

            <span className="text-[#b3b3b3] justify-self-end mr-8">
                {moment.utc(moment.duration(duration, "milliseconds").asMilliseconds()).format("mm:ss").toString()}
            </span>
        </button>
    );
};

export default SongCard;
