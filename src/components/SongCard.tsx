import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import moment from "moment";

import "moment-duration-format";

import { setCurrentSongIndex, setPaused } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { GoogleMaterialIcon, ListingOfAuthors } from ".";

type SongCardProps = {
    songId: string;
    duration: number;
    name: string;
    number: number;

    artists?: ShortArtistInfo[];
    imageURL?: string;
    albumId?: string;
    albumName?: string;
    dateAdded?: string;
    onSongSelect?: React.MouseEventHandler<HTMLElement>
    playlistId?: string,
    hideNumber?: boolean
};

const SongCard: React.FC<SongCardProps> = ({
    number,
    imageURL,
    songId,
    name,
    artists,
    albumId,
    albumName,
    dateAdded,
    duration,
    onSongSelect,
    playlistId,
    hideNumber
}) => {
    const {
        currentSongIndex,
        playlist,
        paused,
        playlistInfo,
        currentPagePlaylistInfo
    } = useAppSelector(state => state.player);

    const [countOfHiddenFields] = useState([hideNumber, !(albumId && albumName), !dateAdded].filter(f => f).length);
    const [dateFormatter] = useState(
        new Intl.DateTimeFormat(Intl.DateTimeFormat().resolvedOptions().locale, {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
    );

    const dispatch = useAppDispatch();

    const handlePlayButtonClick: React.MouseEventHandler<HTMLElement> = e => {
        if (playlistId === playlistInfo?.id) {
            if (playlist[currentSongIndex].id === songId) {
                dispatch(setPaused());
            } else {
                dispatch(setCurrentSongIndex(number - 1));
            }
        } else if (onSongSelect) {
            onSongSelect(e);
        }
    };

    const handleDoubleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
        e.currentTarget.blur();

        if (onSongSelect) {
            onSongSelect(e);
        }
    };

    return (
        <button
            onDoubleClick={handleDoubleClick}
            className={"group grid h-14 gap-4 items-center w-full text-[#b3b3b3] px-4 cursor-default"
                .concat(" rounded text-start text-sm")
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
            {(!hideNumber || !imageURL) && (
                <div className="justify-self-center">
                    <span className="group-hover:hidden group-focus:hidden text-[#b3b3b3]">{number}</span>
                    <GoogleMaterialIcon
                        onClick={handlePlayButtonClick}
                        iconName={playlist[currentSongIndex]?.id === songId && playlistInfo?.id === currentPagePlaylistInfo?.id && !paused ? "pause" : "play_arrow"}
                        FILL={1}
                        size={1.5}
                        className="text-[#b3b3b3] hidden leading-none group-hover:block group-focus:block"
                    />
                </div>
            )}

            <div className="flex gap-4 items-center">
                {imageURL && (
                    <div className="relative w-10 h-10">
                        <Image width={40} height={40} alt="album cover" src={`/api/image_proxy?uri=${imageURL}`} />

                        {hideNumber && (
                            <GoogleMaterialIcon
                                onClick={handlePlayButtonClick}
                                iconName={playlist[currentSongIndex]?.id === songId && !paused ? "pause" : "play_arrow"}
                                FILL={1}
                                size={1.5}
                                className={"text-[#b3b3b3] absolute w-full h-full hidden leading-none items-center"
                                    .concat(" justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2")
                                    .concat(" bg-[rgba(0,0,0,.5)] cursor-pointer shadow-sm group-hover:flex")
                                    .concat(" group-focus:block")}
                            />
                        )}
                    </div>
                )}

                <div>
                    <Link
                        href={`/track/${songId}`}
                        className={"line-clamp-1 hover:underline w-fit"
                            .concat(" ", playlistInfo?.id === currentPagePlaylistInfo?.id && playlist[currentSongIndex]?.id === songId ?
                                "text-[#1ed760]" :
                                "text-[#b3b3b3]"
                            )
                        }
                    >
                        {name}
                    </Link>

                    {!!artists?.length && <ListingOfAuthors artists={artists} />}
                </div>
            </div>

            {albumName && (
                <Link
                    href={`/album/${albumId}`}
                    className="line-clamp-1 text-inherit w-fit max-md:hidden hover:underline"
                >
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
