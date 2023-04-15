import Head from "next/head";
import React, { useEffect } from "react";

import Loader from "@/components/Loader";
import ItemCard from "@/components/ItemCard";
import ListingOfAuthors from "@/components/ListingOfAuthors";
import { changeHeadBGColor, spotifyApi } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";

const AlbumPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();

    const [getAlbums, { data: albums, isFetching }] = spotifyApi.useLazyGetUserSavedAlbumsQuery();

    useEffect(() => {
        if (accessToken) {
            getAlbums({ accessToken });
        }
    }, [accessToken, getAlbums]);

    useEffect(() => {
        dispatch(changeHeadBGColor(["#121212", "#121212"]));
    });

    if (isFetching) {
        return <Loader />;
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

                <div className="grid grid-cols-dynamic gap-dynamic">
                    {albums.items.map(({ album }) => (
                        <ItemCard
                            {...album}
                            key={album.id}
                            description={<ListingOfAuthors artists={album.artists} />}
                            imageURL={album.images[0]?.url}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default AlbumPage;
