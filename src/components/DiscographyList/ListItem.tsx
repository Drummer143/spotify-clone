import React, { useCallback, useEffect } from "react";
import ImageWrapper from "../ImageWrapper";
import GoogleMaterialIcon from "../GoogleMaterialIcon";
import SonglistHead from "../SonglistHead";
import SongCard from "../SongCard";
import { useAppSelector } from "@/hooks";
import { spotifyApi } from "@/redux";

type ListItemProps = {
    name: string;
    albumType: AlbumType;
    releaseDate: string;
    totalSongs: number;
    albumId: string;

    albumImage?: string;
};

const ListItem: React.FC<ListItemProps> = ({ albumImage, name, albumType, releaseDate, totalSongs, albumId }) => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [getAlbums, { data: tracks }] = spotifyApi.useLazyGetAlbumTracksQuery();

    const pluralizeWord = useCallback(() => {
        const lastTwoNumbers = totalSongs % 100;

        if (lastTwoNumbers !== 11 && lastTwoNumbers % 10 === 1) {
            return totalSongs + " song";
        }

        return totalSongs + " songs";
    }, [totalSongs]);

    useEffect(() => {
        if (accessToken) {
            getAlbums({ accessToken, albumId });
        }
    }, [accessToken, albumId, getAlbums]);

    return (
        <div className="mb-8">
            <div className="flex gap-8 p-8 bg-[linear-gradient(#181818,#121212)]">
                <ImageWrapper
                    type="album"
                    height={136}
                    width={136}
                    imageURL={albumImage}
                    proxy
                    imageClassName="aspect-square"
                />

                <div className="flex flex-col flex-grow">
                    <h3 className="text-[2rem] font-bold whitespace-nowrap line-clamp-1">{name}</h3>
                    <p className=" mt-2 text-sm text-[hsla(0,0%,100%,.7)] line-clamp-1">
                        {albumType}
                        {" • "}
                        {new Date(releaseDate).getFullYear()}
                        {" • "}
                        {pluralizeWord()}
                    </p>
                    <div className="flex flex-grow items-end gap-4">
                        <button
                            className={"grid place-content-center w-8 h-8 bg-white text-black rounded-full".concat(
                                " hover:scale-105 active:scale-100 active:bg-[#b7b7b7]"
                            )}
                        >
                            <GoogleMaterialIcon iconName="play_arrow" FILL={1} size={1.7} className="text-inherit" />
                        </button>

                        <button
                            className={"grid place-content-center w-8 h-8 text-[hsla(0,0%,100%,.7)]".concat(
                                " hover:text-white"
                            )}
                        >
                            <GoogleMaterialIcon iconName="favorite" size={1.7} className="text-inherit" />
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <SonglistHead hiddenFields={{ album: true, dateAdded: true }} />

                <div className="px-content-spacing">
                    {tracks?.items.map(song => (
                        <SongCard
                            duration={song.duration_ms}
                            name={song.name}
                            songId={song.id}
                            artists={song.artists}
                            key={song.id}
                            number={song.track_number}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListItem;
