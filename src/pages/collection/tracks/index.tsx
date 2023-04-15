import Head from "next/head";
import React, { useEffect } from "react";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { Tracklist, ActionBar, PlaylistInfo } from "@/components";

const LikeSongPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [getSavedTracks, { currentData: savedTracks, isLoading: tracksIsFetching }] =
        spotifyApi.useLazyGetCurrentUserSavedTracksQuery();
    const [getCurrentUser, { currentData: user, isLoading: userIsFetching }] = spotifyApi.useLazyGetCurrentUserQuery();

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        getCurrentUser(accessToken);
        getSavedTracks({ accessToken });
    }, [accessToken, getCurrentUser, getSavedTracks]);

    if (tracksIsFetching || userIsFetching) {
        return <div>loading...</div>;
    }

    if (!savedTracks || !user) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>Spotify Clone - Liked Songs</title>
            </Head>

            <section className="max-h-full">
                <PlaylistInfo
                    name="Liked songs"
                    ownerId={user.id}
                    imageUrl="/likedSongsImage.png"
                    tracksCount={savedTracks.total}
                    ownerImageUrl={user.images[0]?.url}
                    ownerDisplayName={user.display_name}
                />

                <ActionBar />

                <Tracklist tracks={savedTracks.items} />
            </section>
        </>
    );
};

export default LikeSongPage;
