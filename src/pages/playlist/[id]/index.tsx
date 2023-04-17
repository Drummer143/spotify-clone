import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { setCurrentModal, spotifyApi } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Loader, ActionBar, Tracklist, ItemPageTopSection, PlaylistEditModal } from "@/components";
import PlaylistStats from "@/components/ItemPageTopSection/PlaylistStats";

const PlaylistPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const currentModal = useAppSelector(state => state.app.currentModal);

    const [playlistId, setPlaylistId] = useState<string>();

    const dispatch = useAppDispatch();

    const { query } = useRouter();

    const [followPlaylist] = spotifyApi.useFollowPlaylistMutation();
    const [unfollowPlaylist] = spotifyApi.useUnfollowPlaylistMutation();
    const [getCurrentUser, { currentData: user }] = spotifyApi.useLazyGetCurrentUserQuery();
    const [checkFollow, { data: followInfo }] = spotifyApi.useLazyIsUserFollowsPlaylistQuery();
    const [getOwnerInfo, { data: ownerInfo, isFetching: ownerIsFetching }] = spotifyApi.useLazyGetUserQuery();
    const [getPlaylist, { data: playlistInfo, isFetching: playlistIsFetching }] = spotifyApi.useLazyGetPlaylistQuery();

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

    const handleCloseModal = () => dispatch(setCurrentModal());

    useEffect(() => {
        if (!query.id) {
            return;
        }

        const id = query.id;

        setPlaylistId(Array.isArray(id) ? id[0] : id);
    }, [query.id]);

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

    if (playlistIsFetching || ownerIsFetching) {
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
                    ownerId={ownerInfo?.id}
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
                    userInfo={
                        followInfo
                            ? {
                                isFollowing: followInfo[0],
                                onFollowToggle: handleAddPlaylistToFavorite
                            }
                            : undefined
                    }
                />

                <Tracklist tracks={playlistInfo.tracks.items} />
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
