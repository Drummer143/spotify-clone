import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import moment from "moment";

import "moment-duration-format";

import { GoogleMaterialIcon, ListingOfAuthors } from ".";

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
            className={"group grid h-14 gap-4 items-center w-full text-[#b3b3b3] px-4 cursor-default rounded text-start"
                .concat(" hover:bg-[hsla(0,0%,100%,.1)] focus:bg-[hsla(0,0%,100%,.3)]")
                .concat(
                    countOfHiddenFields === 0
                        ? " grid-cols-tracklist-5 max-lg:grid-cols-tracklist-4 max-md:grid-cols-tracklist-3"
                        : ""
                )
                .concat(countOfHiddenFields === 1 ? " grid-cols-tracklist-4 max-md:grid-cols-tracklist-3" : "")
                .concat(countOfHiddenFields === 2 ? " grid-cols-tracklist-3" : "")
                .concat(countOfHiddenFields === 3 ? " grid-cols-tracklist-2" : "")}
        >
            {number && (
                <div className="justify-self-center">
                    <span className="group-hover:hidden text-[#b3b3b3]">{number}</span>
                    <GoogleMaterialIcon
                        iconName="play_arrow"
                        FILL={1}
                        size={1.5}
                        className="text-[#b3b3b3] hidden leading-none group-hover:block"
                    />
                </div>
            )}

            <div className="flex gap-4">
                <div className="relative w-10 h-10">
                    <Image width={40} height={40} alt="album cover" src={`/api/image_proxy?uri=${imageURL}`} />

                    {!number && (
                        <GoogleMaterialIcon
                            iconName="play_arrow"
                            FILL={1}
                            size={1.5}
                            className={"text-[#b3b3b3] absolute w-full h-full hidden leading-none items-center"
                                .concat(" justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2")
                                .concat(" bg-[rgba(0,0,0,.5)] cursor-pointer shadow-sm group-hover:flex")}
                        />
                    )}
                </div>

                <div>
                    <Link href={`/track/${songId}`} className="line-clamp-1 hover:underline w-fit">
                        {name}
                    </Link>

                    <ListingOfAuthors artists={artists} />
                </div>
            </div>

            {albumName && (
                <Link href={`/album/${albumId}`} className="line-clamp-1 text-inherit w-fit hover:underline">
                    {albumName}
                </Link>
            )}

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
