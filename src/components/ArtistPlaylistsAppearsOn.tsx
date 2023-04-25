import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { albumSortComparator } from "@/utils";
import { Grid, ItemCard, ItemsCollectionHeading } from ".";

const ArtistPlaylistsAppearsOn: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const countOfCardsInColumn = useAppSelector(state => state.app.countOfCardsInColumn);

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
                include_groups: "appears_on"
            }
        });
    }, [accessToken, countOfCardsInColumn, getAlbums, query.id]);

    if (!albums?.items.length) {
        return <></>;
    }

    return (
        <div>
            <ItemsCollectionHeading
                isLink={albums.total > countOfCardsInColumn}
                hrefToFullCollection={`/artist/${query.id}/discography/appears_on`}
                heading="Appears On"
            />

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

export default ArtistPlaylistsAppearsOn;