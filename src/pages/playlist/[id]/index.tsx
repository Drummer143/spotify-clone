import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import PlaylistStats from "@/components/ItemPageTopSection/PlaylistStats";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Loader, ActionBar, PlaylistEditModal, ItemPageTopSection, SongCard, SonglistHead } from "@/components";
import {
    spotifyApi,
    setPlaylist,
    setCurrentModal,
    setCurrentPagePlaylistInfo,
    setHeaderPlayButtonVisibility
} from "@/redux";

const PlaylistPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const currentModal = useAppSelector(state => state.app.currentModal);
    const currentUserId = useAppSelector(state => state.auth.currentUserInfo?.id);
    const isPlaylistRequested = useAppSelector(state => state.player.isPlaylistRequested);

    const [playlistId, setPlaylistId] = useState<string>();

    const dispatch = useAppDispatch();

    const { query } = useRouter();

    const [followPlaylist] = spotifyApi.useFollowPlaylistMutation();
    const [unfollowPlaylist] = spotifyApi.useUnfollowPlaylistMutation();
    const [getCurrentUser, { currentData: user }] = spotifyApi.useLazyGetCurrentUserQuery();
    const [checkFollow, { data: followInfo }] = spotifyApi.useLazyIsUserFollowsPlaylistQuery();
    const [getOwnerInfo, { data: ownerInfo, isLoading: ownerIsLoading }] = spotifyApi.useLazyGetUserQuery();
    const [getPlaylist, { data: playlistInfo, isLoading: playlistIsLoading }] = spotifyApi.useLazyGetPlaylistQuery();

    const handleAddPlaylistToFavorite = useCallback(() => {
        if (!playlistId || !accessToken) {
            return;
        }

        if (followInfo && followInfo[0]) {
            unfollowPlaylist({ accessToken, playlistId });
        } else {
            followPlaylist({ accessToken, playlistId });
        }
    }, [accessToken, followInfo, followPlaylist, playlistId, unfollowPlaylist]);

    const playSongs = useCallback(
        (trackNumber = 0) => {
            if (playlistInfo?.tracks.items.length) {
                const playlist: Playlist = playlistInfo?.tracks.items.map(({ track }) => ({
                    id: track.id,
                    url: track.preview_url
                }));

                dispatch(setPlaylist({ playlist, startIndex: trackNumber, playlistInfo: { id: playlistInfo.id } }));
            }
        },
        [playlistInfo, dispatch]
    );

    const handleCloseModal = () => dispatch(setCurrentModal());

    useEffect(() => {
        if (!query.id) {
            return;
        }

        const id = query.id;

        setPlaylistId(Array.isArray(id) ? id[0] : id);
    }, [query.id]);

    useEffect(() => {
        dispatch(setHeaderPlayButtonVisibility(true));

        if (playlistInfo) {
            dispatch(setCurrentPagePlaylistInfo({ id: playlistInfo.id, type: playlistInfo.type }));
        }

        return () => {
            dispatch(setCurrentPagePlaylistInfo());
            dispatch(setHeaderPlayButtonVisibility(false));
        };
    }, [playlistInfo, dispatch]);

    useEffect(() => {
        if (isPlaylistRequested) {
            playSongs();
        }
    }, [isPlaylistRequested, playSongs]);

    useEffect(() => {
        if (accessToken) {
            getCurrentUser(accessToken);
        }
    }, [accessToken, getCurrentUser]);

    useEffect(() => {
        if (playlistId && accessToken) {
            getPlaylist({ accessToken, playlistId });
        }
    }, [accessToken, playlistId, getPlaylist]);

    useEffect(() => {
        if (playlistInfo && accessToken) {
            getOwnerInfo({ accessToken, userId: playlistInfo.owner.id });
        }
    }, [accessToken, playlistInfo, getOwnerInfo]);

    useEffect(() => {
        if (user && accessToken && playlistId) {
            checkFollow({ accessToken, playlistId, usersIds: user.id });
        }
    }, [accessToken, playlistId, user, checkFollow]);

    if (ownerIsLoading || playlistIsLoading) {
        return <Loader />;
    }

    if (!playlistInfo || !ownerInfo) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>{playlistInfo.name} | Spotify Clone</title>
            </Head>

            <section className="max-h-full">
                <ItemPageTopSection
                    type={playlistInfo.type}
                    description={playlistInfo.description}
                    imageUrl={playlistInfo.images[0]?.url}
                    name={playlistInfo.name}
                    editable={currentUserId === ownerInfo.id}
                >
                    <PlaylistStats
                        ownerDisplayName={playlistInfo.owner.display_name}
                        ownerId={ownerInfo.id}
                        ownerImageUrl={ownerInfo.images[0]?.url}
                        tracksCount={playlistInfo.tracks.total}
                        followersCount={ownerInfo.followers.total}
                    />
                </ItemPageTopSection>

                <ActionBar
                    itemInfo={{
                        isFollowing: !!followInfo && followInfo[0],
                        onFollowToggle: handleAddPlaylistToFavorite,
                        buttonType: "heart"
                    }}
                />

                <div className="relative z-[0] text-sm">
                    <SonglistHead stickyX={64} />

                    <div className="px-content-spacing">
                        {playlistInfo.tracks.items.map(({ track, added_at: dateAdded }, i) => (
                            <SongCard
                                onSongSelect={() => playSongs(i)}
                                key={track.id}
                                number={i + 1}
                                albumId={track.album.id}
                                albumName={track.album.name}
                                artists={track.artists}
                                duration={track.duration_ms}
                                imageURL={track.album.images[2]?.url}
                                name={track.name}
                                songId={track.id}
                                dateAdded={dateAdded}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {playlistInfo.owner.id === user?.id && (
                <PlaylistEditModal
                    onClose={handleCloseModal}
                    isOpen={currentModal === "playlist"}
                    playlistName={playlistInfo.name}
                    imageURL={playlistInfo.images[0]?.url}
                    playlistDescription={playlistInfo.description}
                    playlistId={playlistInfo.id}
                />
            )}
        </>
    );
};

export default PlaylistPage;
