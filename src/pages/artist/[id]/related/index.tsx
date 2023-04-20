import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { ItemCard, Loader } from "@/components";
import Head from "next/head";

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
                <title>
                    {artist?.name ? artist.name + "'s f" : "F"}ans also like | Spotify Clone
                </title>
            </Head>

            <div className="pt-20 px-content-spacing">
                <h2 className="text-2xl font-bold mb-4">Fans also like</h2>

                <div className="grid grid-cols-dynamic gap-dynamic">
                    {relatedArtists.artists.map(artist => (
                        <ItemCard
                            {...artist}
                            key={artist.id}
                            description="Artist"
                            imageURL={artist.images[0]?.url}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Index;