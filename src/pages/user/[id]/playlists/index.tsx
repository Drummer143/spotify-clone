import Head from "next/head";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { Grid, ItemCard, ItemsCollectionRowLoader } from "@/components";

const UserPlaylistsPage: NextPage = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const currentUserName = useAppSelector(state => state.auth.currentUserInfo?.name);

    const { query } = useRouter();

    const [getPlaylists, { currentData: playlists, isLoading }] = spotifyApi.useLazyGetUserPlaylistsQuery();

    useEffect(() => {
        let userId = query.id;

        if (!accessToken || !userId) {
            return;
        }

        if (Array.isArray(userId)) {
            userId = userId[0];
        }

        getPlaylists({ accessToken, userId });
    }, [accessToken, getPlaylists, query.id]);

    if (isLoading) {
        return (
            <div className="px-content-spacing pt-16">
                <ItemsCollectionRowLoader />
            </div>
        );
    }

    if (!playlists) {
        return <div>error</div>;
    }

    return (
        <>
            <Head>
                <title>{currentUserName} - Spotify Clone</title>
            </Head>

            <section className="px-content-spacing pt-16">
                <h2 className="text-2xl mb-4 font-bold">Playlists</h2>

                <Grid>
                    {playlists.items.map(playlist => (
                        <ItemCard
                            id={playlist.id}
                            name={playlist.name}
                            type={playlist.type}
                            description={playlist.description}
                            imageURL={playlist.images[0]?.url}
                            key={playlist.id}
                        />
                    ))}
                </Grid>
            </section>
        </>
    );
};

export default UserPlaylistsPage;