import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { Loader, DiscographyGrid, DiscographyList } from "@/components";
import DiscographyPageHeader from "@/components/DiscographyPageHeader";

const AlbumsPage: NextPage = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [appearance, setAppearance] = useState<"grid" | "list">("list");

    const { query } = useRouter();

    const [getArtist, { data: artist, isLoading: artistIsLoading }] = spotifyApi.useLazyGetArtistQuery();
    const [getAlbums, { data: albums, isLoading: albumsIsLoading }] = spotifyApi.useLazyGetArtistAlbumsQuery();

    useEffect(() => {
        let { group, id } = query;

        if (!accessToken || !group || !id) {
            return;
        }

        [group, id] = [group, id].map(item => (Array.isArray(item) ? item[0] : item));

        const g = group as GroupType;

        getArtist({ accessToken, artistId: id });

        getAlbums({
            accessToken,
            artistId: id,
            searchParams: {
                // eslint-disable-next-line camelcase
                include_groups: g === "all" ? undefined : g
            }
        });
    }, [accessToken, getAlbums, getArtist, query]);

    if (albumsIsLoading || artistIsLoading) {
        return <Loader />;
    }

    if (!albums || !artist) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>{artist.name} - Discography - Spotify Clone</title>
            </Head>

            <section className="pt-20">
                <DiscographyPageHeader
                    appearance={appearance}
                    artistId={artist.id}
                    artistName={artist.name}
                    setAppearance={setAppearance}
                />

                {appearance === "grid" ? (
                    <DiscographyGrid albums={albums.items} />
                ) : (
                    <DiscographyList albums={albums.items} />
                )}
            </section>
        </>
    );
};

export default AlbumsPage;
