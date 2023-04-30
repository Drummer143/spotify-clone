import Head from "next/head";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import {
    Loader,
    ActionBar,
    ArtistsAlbums,
    RelatedArtists,
    ItemPageTopSection,
    PopularArtistTracks,
    ArtistPlaylistsAppearsOn
} from "@/components";

const Index: NextPage = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const { query } = useRouter();

    const [getArtist, { currentData: artist, isLoading }] = spotifyApi.useLazyGetArtistQuery();
    const [checkFollow, { currentData: followInfo }] = spotifyApi.useLazyCheckIfUserFollowsUsersQuery();
    const [followUser] = spotifyApi.useFollowUsersMutation();
    const [unfollowUser] = spotifyApi.useUnFollowUsersMutation();

    const toggleFollow = () => {
        if (!followInfo || !accessToken || !query.id) {
            return;
        }

        if (followInfo[0]) {
            unfollowUser({
                accessToken,
                searchParams: {
                    ids: Array.isArray(query.id) ? query.id : [query.id],
                    type: "artist"
                }
            });
        } else {
            followUser({
                accessToken,
                searchParams: {
                    ids: Array.isArray(query.id) ? query.id : [query.id],
                    type: "artist"
                }
            });
        }
    };

    useEffect(() => {
        let artistId = query.id;

        if (!artistId || !accessToken) {
            return;
        }

        if (Array.isArray(artistId)) {
            artistId = artistId[0];
        }

        checkFollow({ accessToken, searchParams: { type: "artist", ids: [artistId] } });
        getArtist({ accessToken, artistId });
    }, [accessToken, checkFollow, getArtist, query.id]);

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

            <section>
                <ItemPageTopSection name={artist.name} type={artist.type} imageUrl={artist.images[0]?.url} />

                <ActionBar
                    itemInfo={{
                        isFollowing: !!followInfo && followInfo[0],
                        buttonType: "textButton",
                        onFollowToggle: toggleFollow
                    }}
                />

                <div className="px-content-spacing relative z-0 flex gap-10 flex-col">
                    <PopularArtistTracks />

                    <ArtistsAlbums />

                    <ArtistPlaylistsAppearsOn />

                    <RelatedArtists />
                </div>
            </section>
        </>
    );
};

export default Index;
