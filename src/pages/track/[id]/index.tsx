import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { ActionBar, ImageWrapper, ItemPageTopSection, Loader, SongCard } from "@/components";
import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import Head from "next/head";
import AlbumStats from "@/components/ItemPageTopSection/AlbumStats";
import Link from "next/link";

const TrackPage: NextPage = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const { query } = useRouter();

    const [getTrack, { data: trackInfo, isLoading: trackIsLoading }] = spotifyApi.useLazyGetTrackQuery();
    const [getArtist, { data: artistInfo, isLoading: artistIsLoading }] = spotifyApi.useLazyGetArtistQuery();
    const [getAlbumTracks, { data: albumTracks, isLoading: albumIsLoading }] = spotifyApi.useLazyGetAlbumTracksQuery();
    const [checkIsTrackSaved, { data: followInfo }] = spotifyApi.useLazyCheckUserSavedTracksQuery();
    const [followTrack] = spotifyApi.useSaveTracksForCurrentUserMutation();
    const [unfollowTrack] = spotifyApi.useRemoveUserSavedTracksMutation();

    const toggleFollow = () => {
        if (!query.id || !accessToken || !followInfo || !trackInfo) {
            return;
        }

        if (followInfo[0]) {
            unfollowTrack({ accessToken, ids: trackInfo.id });
        } else {
            followTrack({ accessToken, ids: trackInfo.id });
        }
    };

    useEffect(() => {
        let trackId = query.id;

        if (!accessToken || !trackId) {
            return;
        }

        if (Array.isArray(trackId)) {
            trackId = trackId[0];
        }

        getTrack({ accessToken, trackId });
        checkIsTrackSaved({ accessToken, ids: trackId });
    }, [accessToken, checkIsTrackSaved, getTrack, query.id]);

    useEffect(() => {
        if (accessToken && trackInfo) {
            getArtist({ accessToken, artistId: trackInfo.artists[0].id });
            getAlbumTracks({ accessToken, albumId: trackInfo.album.id, searchParams: { limit: 6 } });
        }
    }, [accessToken, getAlbumTracks, getArtist, trackInfo]);

    if (trackIsLoading || artistIsLoading || albumIsLoading) {
        return <Loader />;
    }

    if (!trackInfo || !artistInfo) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>
                    {trackInfo.name} - song by {trackInfo.artists[0].name} | Spotify Clone
                </title>
            </Head>

            <section>
                <ItemPageTopSection
                    name={trackInfo.name}
                    type={trackInfo.type}
                    subheading="song"
                    editable={false}
                    imageUrl={trackInfo.album.images[0]?.url}
                >
                    <AlbumStats
                        ownerDisplayName={trackInfo.artists[0].name}
                        ownerId={trackInfo.artists[0].id}
                        releaseDate={trackInfo.album.release_date}
                        ownerImageURL={artistInfo.images[0]?.url}
                    />
                </ItemPageTopSection>

                <ActionBar itemInfo={{ isFollowing: !!followInfo && followInfo[0], onFollowToggle: toggleFollow }} />

                <div className="px-content-spacing relative z-0">
                    <Link
                        href={`/artist/${artistInfo.id}`}
                        className={"flex items-center gap-4 p-2 rounded transition-[background-color]".concat(
                            " hover:bg-[hsla(0,0%,100%,.1)]"
                        )}
                    >
                        <ImageWrapper
                            type={artistInfo.type}
                            height={80}
                            width={80}
                            imageURL={artistInfo.images[0]?.url}
                            proxy
                            imageClassName="rounded-full"
                        />

                        <div>
                            <p className="text-sm mb-1">Artist</p>
                            <p className="font-bold w-max hover:underline">{artistInfo.name}</p>
                        </div>
                    </Link>

                    <Link
                        href={`/album/${trackInfo.album.id}`}
                        className={"flex items-center gap-4 p-2 rounded-t-lg mt-10 transition-[background-color]"
                            .concat(" bg-[hsla(0,0%,100%,.1)]")
                            .concat(" hover:bg-[hsla(0,0%,100%,.3)]")}
                    >
                        <ImageWrapper
                            type={artistInfo.type}
                            height={80}
                            width={80}
                            imageURL={trackInfo.album.images[0]?.url}
                            proxy
                            imageClassName="rounded-full"
                        />

                        <div>
                            <p className="text-sm mb-1">From the {trackInfo.album.album_type}</p>
                            <p className="font-bold w-max hover:underline">{trackInfo.album.name}</p>
                        </div>
                    </Link>

                    <div>
                        {albumTracks?.items.map(track => (
                            <SongCard
                                duration={track.duration_ms}
                                songId={track.id}
                                key={track.id}
                                name={track.name}
                                number={track.track_number}
                                artists={track.artists}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TrackPage;
