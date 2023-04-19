import Head from "next/head";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import {
    ArtistPlaylistsAppearsOn,
    ArtistsAlbums,
    ItemPageTopSection,
    Loader,
    PlayButton,
    PopularArtistTracks,
    RelatedArtists,
    UserFollowButton
} from "@/components";

const Index: NextPage = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const currentUserId = useAppSelector(state => state.auth.currentUserInfo?.id);

    const { query } = useRouter();

    const [getArtist, { currentData: artist, isLoading }] = spotifyApi.useLazyGetArtistQuery();

    useEffect(() => {
        let artistId = query.id;

        if (!artistId || !accessToken) {
            return;
        }

        if (Array.isArray(artistId)) {
            artistId = artistId[0];
        }

        getArtist({ accessToken, artistId });
    }, [accessToken, getArtist, query.id]);

    if (isLoading) {
        return <Loader />;
    }

    if (!artist) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>{artist.name} | Spotify Clone</title>
            </Head>

            <div>
                <ItemPageTopSection
                    name={artist.name}
                    type={artist.type}
                    imageUrl={artist.images[0]?.url}
                />

                <div className="px-content-spacing flex gap-10 flex-col">
                    <div className="pt-6 flex gap-8 items-center">
                        <PlayButton />

                        {artist.id !== currentUserId && <UserFollowButton type="artist" targetId={artist.id} />}
                    </div>

                    <PopularArtistTracks />

                    <ArtistsAlbums />

                    <ArtistPlaylistsAppearsOn />

                    <RelatedArtists />
                </div>
            </div>
        </>
    );
};

export default Index;
