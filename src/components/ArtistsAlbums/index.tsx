import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks";
import { spotifyApi } from "@/redux";
import { ItemCard, ItemsCollectionRowHeading } from "..";
import GroupToggleButton from "./GroupToggleButton";

type GroupType = "all" | "album" | "single";

const ArtistsAlbums: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const countOfCardsInColumn = useAppSelector(state => state.app.countOfCardsInColumn);

    const [groupType, setGroupType] = useState<GroupType>("all");

    const { query } = useRouter();

    const sortComparator = (a: AlbumInfo, b: AlbumInfo) => {
        const aReleaseDate = new Date(a.release_date);
        const bReleaseDate = new Date(b.release_date);

        if (aReleaseDate > bReleaseDate) {
            return -1;
        }

        if (bReleaseDate > aReleaseDate) {
            return 1;
        }

        return 0;
    };

    const [getAlbums, { data: albums }] = spotifyApi.useLazyGetArtistAlbumsQuery({
        selectFromResult: result => {
            if (!result.currentData) {
                return result;
            }

            const sortedAlbums = result.currentData.items.slice().sort(sortComparator);

            return {
                ...result,
                currentData: {
                    ...result.currentData,
                    items: sortedAlbums
                }
            };
        }
    });

    const handleRadioButtonChange: React.ChangeEventHandler<HTMLInputElement> = e =>
        setGroupType(e.currentTarget.id as GroupType);

    useEffect(() => {
        let artistId = query.id;

        if (!accessToken || !artistId) {
            return;
        }

        if (Array.isArray(artistId)) {
            artistId = artistId[0];
        }

        getAlbums({
            accessToken,
            artistId,
            searchParams: {
                limit: countOfCardsInColumn,
                // eslint-disable-next-line camelcase
                include_groups: groupType === "all" ? undefined : groupType
            }
        });
    }, [accessToken, countOfCardsInColumn, getAlbums, groupType, query.id]);

    if (!albums) {
        return <></>;
    }

    return (
        <div>
            <ItemsCollectionRowHeading
                isLink={albums.total > countOfCardsInColumn}
                hrefToFullCollection={`/artist/${query.id}/discography/${groupType}`}
                heading="Discography"

            />

            <div className="flex gap-2 mb-4">
                <GroupToggleButton checked={groupType === "all"} onChange={handleRadioButtonChange} id="all">
                    All releases
                </GroupToggleButton>

                <GroupToggleButton checked={groupType === "album"} onChange={handleRadioButtonChange} id="album">
                    Albums
                </GroupToggleButton>

                <GroupToggleButton checked={groupType === "single"} onChange={handleRadioButtonChange} id="single">
                    Singles
                </GroupToggleButton>
            </div>

            <div className="grid grid-cols-dynamic gap-dynamic">
                {albums.items.slice(0, countOfCardsInColumn).map(album => (
                    <ItemCard
                        {...album}
                        key={album.id}
                        imageURL={album.images[1]?.url}
                        description={
                            <p>
                                <span>{new Date(album.release_date).getFullYear()}</span>
                                <span className="mx-1 text-base">•</span>
                                <span className="first-letter:uppercase">{album.album_type}</span>
                            </p>
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default ArtistsAlbums;