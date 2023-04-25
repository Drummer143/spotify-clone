import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { Grid, ItemCard, Loader } from "@/components";

const Index: NextPage = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const { query } = useRouter();

    const [getArtist, { currentData: artist }] = spotifyApi.useLazyGetArtistQuery();
    const [getRelatedArtists, { currentData: relatedArtists, isLoading }] =
        spotifyApi.useLazyGetArtistRelatedArtistsQuery();

    useEffect(() => {
        let artistId = query.id;

        if (!accessToken || !artistId) {
            return;
        }

        if (Array.isArray(artistId)) {
            artistId = artistId[0];
        }

        getRelatedArtists({ accessToken, artistId });
        getArtist({ accessToken, artistId });
    }, [accessToken, getArtist, getRelatedArtists, query.id]);

    if (isLoading) {
        return <Loader />;
    }

    if (!relatedArtists) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>{artist?.name ? artist.name + "'s f" : "F"}ans also like | Spotify Clone</title>
            </Head>

            <div className="pt-20 px-content-spacing">
                <h2 className="text-2xl font-bold mb-4">Fans also like</h2>

                <Grid>
                    {relatedArtists.artists.map(artist => (
                        <ItemCard {...artist} key={artist.id} description="Artist" imageURL={artist.images[0]?.url} />
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default Index;
