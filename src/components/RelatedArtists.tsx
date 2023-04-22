import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { Grid, ItemCard, ItemsCollectionHeading } from ".";

const RelatedArtists: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const countOfCardsInColumn = useAppSelector(state => state.app.countOfCardsInColumn);

    const { query } = useRouter();

    const [getRelatedArtists, { data: artists }] = spotifyApi.useLazyGetArtistRelatedArtistsQuery({
        selectFromResult: result => ({
            ...result,
            data: result.data?.artists
        })
    });

    useEffect(() => {
        let artistId = query.id;

        if (!accessToken || !artistId) {
            return;
        }

        if (Array.isArray(artistId)) {
            artistId = artistId[0];
        }

        getRelatedArtists({ accessToken, artistId });
    }, [accessToken, countOfCardsInColumn, getRelatedArtists, query.id]);

    if (!artists) {
        return <></>;
    }

    return (
        <div>
            <ItemsCollectionHeading
                isLink
                hrefToFullCollection={`/artist/${query.id}/related`}
                heading="Fans Also Likes"
            />

            <Grid>
                {artists.slice(0, countOfCardsInColumn).map(artist => (
                    <ItemCard
                        {...artist}
                        key={artist.id}
                        imageURL={artist.images[1]?.url}
                        description="Artist"
                    />
                ))}
            </Grid>
        </div>
    );
};

export default RelatedArtists;