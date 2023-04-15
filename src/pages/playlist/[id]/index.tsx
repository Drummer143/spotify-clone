import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { Loader, ActionBar, Tracklist, PlaylistInfo } from "@/components";

const PlaylistPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [playlistId, setPlaylistId] = useState<string>();

    const { query } = useRouter();

    const [getPlaylist, { data: playlistInfo, isFetching: playlistIsFetching }] = spotifyApi.useLazyGetPlaylistQuery();
    const [getOwnerInfo, { data: ownerInfo, isFetching: ownerIsFetching }] = spotifyApi.useLazyGetUserQuery();
    const [unfollowPlaylist] = spotifyApi.useUnfollowPlaylistMutation();
    const [followPlaylist] = spotifyApi.useFollowPlaylistMutation();
    const [getCurrentUser, { currentData: user }] = spotifyApi.useLazyGetCurrentUserQuery();
    const [checkFollow, { data: followInfo }] = spotifyApi.useLazyIsUserFollowsPlaylistQuery();

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
                <PlaylistInfo
                    description={playlistInfo.description}
                    followersCount={playlistInfo.followers.total}
                    imageUrl={playlistInfo.images[0].url}
                    name={playlistInfo.name}
                    ownerDisplayName={ownerInfo?.display_name}
                    ownerId={ownerInfo?.id}
                    ownerImageUrl={ownerInfo?.images[0]?.url}
                    tracksCount={playlistInfo.tracks.total}
                />

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
        </>
    );
};

export default PlaylistPage;
