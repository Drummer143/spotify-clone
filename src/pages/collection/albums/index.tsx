import Head from "next/head";
import React, { useEffect } from "react";

import { changeHeadBGColor, spotifyApi } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { ItemCard, ListingOfAuthors, ItemsCollectionRowLoader, Grid } from "@/components";

const AlbumPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();

    const [getAlbums, { data: albums, isLoading }] = spotifyApi.useLazyGetUserSavedAlbumsQuery();

    useEffect(() => {
        if (accessToken) {
            getAlbums({ accessToken });
        }
    }, [accessToken, getAlbums]);

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

    if (!albums) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>Spotify Clone - Your Library</title>
            </Head>

            <section className="px-content-spacing py-16">
                <h2 className="text-2xl font-bold mb-4">Your playlists</h2>

                <Grid>
                    {albums.items.map(({ album }) => (
                        <ItemCard
                            {...album}
                            key={album.id}
                            description={<ListingOfAuthors artists={album.artists} />}
                            imageURL={album.images[0]?.url}
                        />
                    ))}
                </Grid>
            </section>
        </>
    );
};

export default AlbumPage;
