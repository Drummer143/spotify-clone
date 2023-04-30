import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { SongCard } from ".";
import { setCurrentPagePlaylistInfo, setHeaderPlayButtonVisibility, setPlaylist, spotifyApi } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";

const PopularArtistTracks: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const isPlaylistRequested = useAppSelector(state => state.player.isPlaylistRequested);

    const dispatch = useAppDispatch();

    const { query } = useRouter();

    const [countOfDisplayingTracks, setCountOfDisplayingTracks] = useState(5);

    const [getTracks, { currentData: tracks }] = spotifyApi.useLazyGetArtistTopTrackQuery({
        selectFromResult: result => {
            const currentData = result.currentData?.tracks;

            return {
                ...result,
                currentData
            };
        }
    });

    const handleExpandButtonClick = () => setCountOfDisplayingTracks(prev => (prev === 5 ? 10 : 5));

    const playSongs = useCallback(
        (trackNumber = 0) => {
            if (tracks?.length) {
                const playlist: Playlist = tracks?.map(track => ({
                    id: track.id,
                    url: track.preview_url
                }));

                dispatch(
                    setPlaylist({
                        playlist,
                        startIndex: trackNumber,
                        playlistInfo: query.id
                            ? {
                                  id: Array.isArray(query.id) ? query.id[0] : query.id,
                                  type: "artist"
                              }
                            : undefined
                    })
                );
            }
        },
        [dispatch, query.id, tracks]
    );

    useEffect(() => {
        dispatch(setHeaderPlayButtonVisibility(true));

        if (tracks && query.id) {
            dispatch(
                setCurrentPagePlaylistInfo({
                    id: Array.isArray(query.id) ? query.id[0] : query.id,
                    type: "artist"
                })
            );
        }

        return () => {
            dispatch(setCurrentPagePlaylistInfo());
            dispatch(setHeaderPlayButtonVisibility(false));
        };
    }, [dispatch, query.id, tracks]);

    useEffect(() => {
        let artistId = query.id;

        if (!accessToken || !artistId) {
            return;
        }

        setCountOfDisplayingTracks(5);

        if (Array.isArray(artistId)) {
            artistId = artistId[0];
        }

        getTracks({ accessToken, artistId, market: "AM" });
    }, [accessToken, getTracks, query.id]);

    useEffect(() => {
        if (isPlaylistRequested) {
            playSongs();
        }
    }, [isPlaylistRequested, playSongs]);

    if (!tracks?.length) {
        return <></>;
    }

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Popular</h3>

            {tracks.slice(0, countOfDisplayingTracks).map((track, i) => (
                <SongCard
                    onSongSelect={() => playSongs(i)}
                    songId={track.id}
                    duration={track.duration_ms}
                    imageURL={track.album.images[0]?.url}
                    name={track.name}
                    number={i + 1}
                    key={track.id}
                />
            ))}

            <button
                className="p-4 text-sm text-[hsla(0,0%,100%,.7)] transition-[color] hover:text-white"
                onClick={handleExpandButtonClick}
            >
                {countOfDisplayingTracks === 5 ? "See more" : "Show less"}
            </button>
        </div>
    );
};

export default PopularArtistTracks;
