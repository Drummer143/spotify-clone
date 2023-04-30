import Head from "next/head";
import React, { useCallback, useEffect } from "react";

import PlaylistStats from "@/components/ItemPageTopSection/PlaylistStats";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks";
import { SAVED_SONGS_ID } from "@/utils";
import { setCurrentPagePlaylistInfo, setPlaylist, spotifyApi } from "@/redux";
import { ActionBar, ItemPageTopSection, Loader, SonglistHead, SongCard } from "@/components";

const LikeSongPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const isPlaylistRequested = useAppSelector(state => state.player.isPlaylistRequested);

    const dispatch = useDispatch();

    const [getSavedTracks, { currentData: savedTracks, isLoading: tracksIsLoading }] =
        spotifyApi.useLazyGetCurrentUserSavedTracksQuery();
    const [getCurrentUser, { currentData: user, isLoading: userIsLoading }] = spotifyApi.useLazyGetCurrentUserQuery();

    const playSongs = useCallback(
        (trackNumber = 0) => {
            if (savedTracks?.items.length) {
                const playlist: Playlist = savedTracks.items.map(({ track }) => ({
                    id: track.id,
                    url: track.preview_url
                }));

                dispatch(setPlaylist({ playlist, startIndex: trackNumber, playlistInfo: { id: SAVED_SONGS_ID } }));
            }
        },
        [dispatch, savedTracks]
    );

    useEffect(() => {
        dispatch(setCurrentPagePlaylistInfo({ id: SAVED_SONGS_ID }));
    }, [dispatch]);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        getCurrentUser(accessToken);
        getSavedTracks({ accessToken });
    }, [accessToken, getCurrentUser, getSavedTracks]);

    useEffect(() => {
        if (isPlaylistRequested) {
            playSongs();
        }
    }, [isPlaylistRequested, playSongs]);

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
                <ItemPageTopSection name="Liked songs" type="playlist" imageUrl="/likedSongsImage.png">
                    <PlaylistStats
                        ownerDisplayName={user.display_name}
                        ownerId={user.id}
                        tracksCount={savedTracks.total}
                        ownerImageUrl={user.images[0]?.url}
                    />
                </ItemPageTopSection>

                <ActionBar />

                <div className="relative z-[0] text-sm">
                    <SonglistHead stickyX={64} />

                    <div className="px-content-spacing">
                        {savedTracks.items.map(({ track, added_at: dateAdded }, i) => (
                            <SongCard
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
                                onSongSelect={() => playSongs(i)}
                                playlistId={SAVED_SONGS_ID}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default LikeSongPage;
