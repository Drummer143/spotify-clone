import Head from "next/head";
import React, { useEffect } from "react";

import PlaylistStats from "@/components/ItemPageTopSection/PlaylistStats";
import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { Tracklist, ActionBar, ItemPageTopSection, Loader } from "@/components";

const LikeSongPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [getSavedTracks, { currentData: savedTracks, isLoading: tracksIsLoading }] =
        spotifyApi.useLazyGetCurrentUserSavedTracksQuery();
    const [getCurrentUser, { currentData: user, isLoading: userIsLoading }] = spotifyApi.useLazyGetCurrentUserQuery();

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        getCurrentUser(accessToken);
        getSavedTracks({ accessToken });
    }, [accessToken, getCurrentUser, getSavedTracks]);

    if (tracksIsLoading || userIsLoading) {
        return <Loader />;
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
                <ItemPageTopSection
                    name="Liked songs"
                    type="playlist"
                    imageUrl="/likedSongsImage.png"
                >
                    <PlaylistStats
                        ownerDisplayName={user.display_name}
                        ownerId={user.id}
                        tracksCount={savedTracks.total}
                        ownerImageUrl={user.images[0]?.url}
                    />
                </ItemPageTopSection>

                <ActionBar />

                <Tracklist tracks={savedTracks.items} />
            </section>
        </>
    );
};

export default LikeSongPage;
