import Head from "next/head";
import { NextPage } from "next";
import { useEffect } from "react";

import { changeHeadBGColor, spotifyApi } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { ItemCard, ItemsCollectionRowLoader } from "@/components";

const Index: NextPage = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const currentUserName = useAppSelector(state => state.auth.currentUserInfo?.name);

    const dispatch = useAppDispatch();

    const [getArtists, { currentData: artists, isLoading }] = spotifyApi.useLazyGetFollowedArtistsQuery();

    useEffect(() => {
        if (accessToken) {
            getArtists({ accessToken });
        }

        dispatch(changeHeadBGColor("authentificated"));
    }, [accessToken, dispatch, getArtists]);

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
                <title>{currentUserName} - Spotify Clone</title>
            </Head>

            <section className="px-content-spacing pt-16">
                <h2 className="text-2xl mb-4 font-bold">Following</h2>

                <div className="grid grid-cols-dynamic gap-dynamic">
                    {artists.artists.items.map(artist => (
                        <ItemCard
                            id={artist.id}
                            name={artist.name}
                            type={artist.type}
                            description="Profile"
                            imageURL={artist.images[0]?.url}
                            key={artist.id}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Index;