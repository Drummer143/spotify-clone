import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { Grid, ItemCard, ItemsCollectionRowLoader } from "@/components";

const GenreCollection: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const router = useRouter();

    const [getPlaylists, { data: playlists, isLoading: playlistsIsLoading }] =
        spotifyApi.useLazyGetCategoryPlaylistsQuery();
    const [getCategoryInfo, { currentData: categoryInfo, isLoading: categoryInfoIsLoading }] =
        spotifyApi.useLazyGetSingleBrowseCategoryQuery();

    useEffect(() => {
        let id = router.query.id;

        if (!accessToken || !id) {
            return;
        }

        if (Array.isArray(id)) {
            id = id[0];
        }

        const locale = Intl.DateTimeFormat().resolvedOptions().locale;

        getPlaylists({ accessToken, categoryId: id });
        getCategoryInfo({ accessToken, categoryId: id, searchParams: { locale } });
    }, [accessToken, getCategoryInfo, getPlaylists, router.query]);

    if (playlistsIsLoading || categoryInfoIsLoading) {
        return (
            <div className="px-content-spacing pt-16">
                <ItemsCollectionRowLoader />
            </div>
        );
    }

    if (!playlists || !categoryInfo) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>{categoryInfo.name} | Spotify Clone</title>
            </Head>

            <section className="px-content-spacing">
                <h2 className="text-2xl font-bold mb-4">{categoryInfo.name}</h2>

                <Grid>
                    {playlists.playlists.items.map(playlist => (
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

export default GenreCollection;
