import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import ActionBar from "@/components/ActionBar";
import Tracklist from "@/components/Tracklist";
import PlaylistInfo from "@/components/PlaylistInfo/PlaylistInfo";
import { spotifyApi, setTitle } from "@/redux";
import { useAppSelector, useAppDispatch } from "@/hooks";

const PlaylistPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();
    const { query } = useRouter();

    const [getPlaylist, { data: playlistInfo, isFetching: playlistIsFetching }] = spotifyApi.useLazyGetPlaylistQuery();
    const [getOwnerInfo, { data: ownerInfo, isFetching: ownerIsFetching }] = spotifyApi.useLazyGetUserQuery();

    useEffect(() => {
        let id = query.id;

        if (id && accessToken) {
            id = Array.isArray(id) ? id[0] : id;

            getPlaylist({ accessToken, playlistId: id });
        }
    }, [query, accessToken, getPlaylist])

    useEffect(() => {
        if (playlistInfo?.owner.id && accessToken) {
            getOwnerInfo({ accessToken, userId: playlistInfo.owner.id });
        }
    }, [playlistInfo, accessToken, getOwnerInfo]);

    useEffect(() => {
        if (!playlistInfo) {
            return;
        }

        dispatch(setTitle(`${playlistInfo.name} | Spotify Clone`));
    }, [dispatch, playlistInfo]);

    return (
        <>
            <Head>
                <title>{playlistInfo && `${playlistInfo.name} | Spotify Clone`}</title>
            </Head>

            {playlistInfo && ownerInfo && (
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

                    <ActionBar playlistId={Array.isArray(query.id) ? query.id[0] : (query.id || "")} />

                    <Tracklist tracks={playlistInfo.tracks.items} />
                </section>
            )}
        </>
    );
};

export default PlaylistPage;
