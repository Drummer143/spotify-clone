import Head from "next/head";
import React, { useEffect } from "react";

import { changeHeadBGColor, spotifyApi } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { ItemCard, ItemsCollectionRowLoader } from "@/components";

const ArtistsPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();

    const [getArtists, { data: artists, isLoading }] = spotifyApi.useLazyGetFollowedArtistsQuery();

    useEffect(() => {
        if (accessToken) {
            getArtists({ accessToken });
        }
    }, [accessToken, getArtists]);

    useEffect(() => {
        dispatch(changeHeadBGColor(["#121212", "#121212"]));
    });

    if (isLoading) {
        return (
            <div className="px-content-spacing pt-16">
                <ItemsCollectionRowLoader />
            </div>
        );
    }

    if (!artists) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>Spotify Clone - Your Library</title>
            </Head>

            <section className="px-content-spacing py-16">
                <h2 className="text-2xl font-bold mb-4">Your playlists</h2>

                <div className="grid grid-cols-dynamic gap-dynamic">
                    {artists.artists.items.map(artist => (
                        <ItemCard {...artist} key={artist.id} description="Artist" imageURL={artist.images[0]?.url} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default ArtistsPage;
