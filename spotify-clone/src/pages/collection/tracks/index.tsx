import React, { useEffect } from 'react';

import Layout from '@/components/Layout';
import ActionBar from '@/components/LikedSongsPage/ActionBar';
import Tracklist from '@/components/LikedSongsPage/Tracklist';
import PlaylistInfo from '@/components/PlaylistInfo/PlaylistInfo';
import { spotifyApi } from '@/redux';
import { useAppSelector } from '@/hooks';

const LikeSongPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [getSavedTracks, { currentData: savedTracks, isFetching: trackIsFetching }] = spotifyApi.useLazyGetCurrentUserSavedTracksQuery();
    const [getCurrentUser, { currentData: user, isFetching: userIsFetching }] = spotifyApi.useLazyGetCurrentUserQuery();

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        getCurrentUser(accessToken)
        getSavedTracks({ accessToken });
    }, [accessToken, getCurrentUser, getSavedTracks]);

    if (!savedTracks || !user) {
        return <div>loading...</div>;
    }

    return (
        <Layout isLoading={trackIsFetching && userIsFetching} title="Spotify Clone - Liked Songs">
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
        </Layout>
    );
}

export default LikeSongPage;