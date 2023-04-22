/* eslint-disable camelcase */

import React, { useEffect } from "react";

import Loader from "./Loader";
import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { ItemCard, ItemsCollectionHeading, SongCard } from ".";

type CurrentUserPagePartProps = {
    user: GetUserResponse;
};

const CurrentUserPagePart: React.FC<CurrentUserPagePartProps> = ({ user }) => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const countOfCardsInColumn = useAppSelector(state => state.app.countOfCardsInColumn);

    const [getFollowedArtists, {
        currentData: followedArtists,
        isLoading: followedArtistsIsLoading
    }] = spotifyApi.useLazyGetFollowedArtistsQuery();

    const [getTopTracks, {
        currentData: topTracks,
        isLoading: topTracksIsLoading
    }] = spotifyApi.useLazyGetUserTopTracksQuery();

    const [getTopArtists, {
        currentData: topArtists,
        isLoading: topArtistsIsLoading
    }] = spotifyApi.useLazyGetUserTopArtistsQuery();

    useEffect(() => {
        if (accessToken) {
            getFollowedArtists({ accessToken, searchParams: { limit: countOfCardsInColumn } });
            getTopArtists({ accessToken, searchParams: { limit: countOfCardsInColumn } });
            getTopTracks({ accessToken, searchParams: { limit: 4 } });
        }
    }, [accessToken, countOfCardsInColumn, getFollowedArtists, getTopArtists, getTopTracks]);

    if (followedArtistsIsLoading || topTracksIsLoading || topArtistsIsLoading) {
        return <Loader />;
    }

    return (
        <>
            {!!topArtists?.items.length && (
                <section>
                    <p className="text-2xl font-bold first-letter:uppercase mb-4">
                        Top artists this month
                    </p>

                    {topArtists.items.slice(0, countOfCardsInColumn).map(artist => (
                        <ItemCard
                            {...artist}
                            key={artist.id}
                            imageURL={artist.images[0]?.url}
                            description="Artist"
                        />
                    ))}
                </section>
            )}

            {!!topTracks?.items.length && (
                <section>
                    <ItemsCollectionHeading
                        isLink
                        heading="Top tracks this month"
                        hrefToFullCollection={`/user/${user.id}/top/tracks`}
                    />

                    {topTracks.items.map((track, i) => (
                        <SongCard
                            artists={track.artists}
                            duration={track.duration_ms}
                            imageURL={track.album.images[0]?.url}
                            name={track.name}
                            songId={track.id}
                            albumId={track.album.id}
                            albumName={track.album.name}
                            number={i + 1}
                            key={track.id}
                        />
                    ))}
                </section>
            )}

            {!!followedArtists?.artists.items.length && (
                <section>
                    <ItemsCollectionHeading
                        isLink
                        heading="following"
                        hrefToFullCollection={`/user/${user.id}/following`}
                    />

                    {followedArtists.artists.items.slice(0, countOfCardsInColumn).map(artist => (
                        <ItemCard
                            {...artist}
                            key={artist.id}
                            imageURL={artist.images[0]?.url}
                            description="Artist"
                        />
                    ))}
                </section>
            )}
        </>
    );
};

export default CurrentUserPagePart;