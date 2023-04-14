import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Loader from '@/components/Loader';
import { spotifyApi } from '@/redux';
import { useAppSelector } from '@/hooks';
import ItemCard from '@/components/ItemCard';
import Head from 'next/head';

const GenreCollection: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const router = useRouter();

    const [getPlaylists, { data: playlists, isFetching: playlistsIsFetching }] = spotifyApi.useLazyGetCategoryPlaylistsQuery();
    const [getCategoryInfo, { currentData: categoryInfo, isFetching: categoryInfoIsFetching }] = spotifyApi.useLazyGetSingleBrowseCategoryQuery();

    useEffect(() => {
        let id = router.query.id;

        if (!accessToken || !id) {
            return;
        }

        if (Array.isArray(id)) {
            id = id[0];
        }

        const locale = Intl.DateTimeFormat().resolvedOptions().locale;

        console.log(locale);

        getPlaylists({ accessToken, categoryId: id });
        getCategoryInfo({ accessToken, categoryId: id, searchParams: { locale } })
    }, [accessToken, router.query]);

    if (playlistsIsFetching || categoryInfoIsFetching) {
        return <Loader />;
    }

    if (!playlists || !categoryInfo) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>{categoryInfo.name} | Spotify Clone</title>
            </Head>

            <section className="py-16 px-content-spacing">
                <h2 className="text-2xl font-bold mb-4">{categoryInfo.name}</h2>

                <div className="grid gap-dynamic grid-cols-dynamic">
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
                </div>
            </section>
        </>
    )
}
export default GenreCollection;