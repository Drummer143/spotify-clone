import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import GroupToggleButton from "./GroupToggleButton";
import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { albumSortComparator } from "@/utils";
import { Grid, ItemCard, ItemsCollectionHeading } from "..";

const ArtistsAlbums: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const countOfCardsInColumn = useAppSelector(state => state.app.countOfCardsInColumn);

    const [groupType, setGroupType] = useState<GroupType>("all");

    const { query } = useRouter();

    const [getAlbums, { data: albums }] = spotifyApi.useLazyGetArtistAlbumsQuery({
        selectFromResult: result => {
            if (!result.currentData) {
                return result;
            }

            const sortedAlbums = result.currentData.items.slice().sort(albumSortComparator);

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
            <ItemsCollectionHeading
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

            <Grid>
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
            </Grid>
        </div>
    );
};

export default ArtistsAlbums;
