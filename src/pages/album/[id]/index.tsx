import Head from "next/head";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import AlbumStats from "@/components/ItemPageTopSection/AlbumStats";
import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { ActionBar, ItemPageTopSection, Loader, SongCard, SonglistHead } from "@/components";

const AlbumPage: NextPage = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const { query } = useRouter();

    const [getAlbum, { data: albumInfo, isLoading }] = spotifyApi.useLazyGetAlbumQuery();
    const [getArtistImage, { data: ownerInfo }] = spotifyApi.useLazyGetArtistQuery();
    const [checkIsAlbumSaved, { data: followInfo }] = spotifyApi.useLazyCheckUserSavedAlbumsQuery();
    const [followAlbum] = spotifyApi.useSaveAlbumsForCurrentUserMutation();
    const [unfollowAlbum] = spotifyApi.useRemoveUserSavedAlbumsMutation();

    const toggleFollow = () => {
        if (!followInfo || !accessToken || !query.id) {
            return;
        }

        if (followInfo[0]) {
            unfollowAlbum({ accessToken, ids: query.id });
        } else {
            followAlbum({ accessToken, ids: query.id });
        }
    };

    useEffect(() => {
        let albumId = query.id;

        if (!accessToken || !albumId) {
            return;
        }

        if (Array.isArray(albumId)) {
            albumId = albumId[0];
        }

        getAlbum({ accessToken, albumId });
        checkIsAlbumSaved({ accessToken, ids: albumId });
    }, [accessToken, checkIsAlbumSaved, getAlbum, query.id]);

    useEffect(() => {
        if (accessToken && albumInfo) {
            getArtistImage({ accessToken, artistId: albumInfo.artists[0].id });
        }
    }, [accessToken, albumInfo, getArtistImage]);

    if (isLoading) {
        return <Loader />;
    }

    if (!albumInfo) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>{albumInfo.name} - Spotify Clone</title>
            </Head>

            <section>
                <ItemPageTopSection
                    name={albumInfo.name}
                    type={albumInfo.type}
                    subheading={albumInfo.album_group}
                    imageUrl={albumInfo.images[0]?.url}
                    editable={false}
                >
                    <AlbumStats
                        ownerDisplayName={albumInfo.artists[0].name}
                        ownerId={albumInfo.artists[0].id}
                        totalSongs={albumInfo.total_tracks}
                        releaseDate={albumInfo.release_date}
                        ownerImageURL={ownerInfo?.images[0]?.url}
                    />
                </ItemPageTopSection>

                <ActionBar itemInfo={{ isFollowing: !!followInfo && followInfo[0], onFollowToggle: toggleFollow }} />

                <SonglistHead stickyX={64} hiddenFields={{ album: true, dateAdded: true }} />

                <div className="px-content-spacing relative z-0">
                    {albumInfo.tracks.items.map(song => (
                        <SongCard
                            duration={song.duration_ms}
                            key={song.id}
                            songId={song.id}
                            name={song.name}
                            artists={song.artists}
                            number={song.track_number}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default AlbumPage;