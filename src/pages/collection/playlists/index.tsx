import Link from "next/link";
import Head from "next/head";
import React, { useEffect } from "react";

import { changeHeadBGColor, spotifyApi } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { ItemCard, PlayButton, ItemsCollectionRowLoader } from "@/components";

const PlaylistCollectionPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [getPlaylists, { data: playlists, isLoading: playlistsIsLoading }] =
        spotifyApi.useLazyGetCurrentUserPlaylistsQuery();
    const [getSavedTracks, { data: savedTracks, isLoading: savedTracksIsLoading }] =
        spotifyApi.useLazyGetCurrentUserSavedTracksQuery();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (accessToken) {
            getPlaylists(accessToken);
            getSavedTracks({ accessToken, searchParams: { limit: 10 } });
        }
    }, [accessToken, getPlaylists, getSavedTracks]);

    useEffect(() => {
        dispatch(changeHeadBGColor(["#121212", "#121212"]));
    });

    if (savedTracksIsLoading || playlistsIsLoading) {
        return (
            <div className="px-content-spacing pt-16">
                <ItemsCollectionRowLoader />
            </div>
        );
    }

    if (!playlists) {
        return <div>Error</div>;
    }

    return (
        <>
            <Head>
                <title>Spotify Clone - Your Library</title>
            </Head>

            <section className="px-content-spacing py-16">
                <h2 className="text-2xl font-bold mb-4">Your playlists</h2>

                <div className="grid grid-cols-dynamic gap-dynamic">
                    <Link
                        href="/collection/tracks"
                        className={"group col-span-2 rounded-[clamp(4px,32px_*_0.025,8px)] flex flex-col gap-5".concat(
                            " text-base p-5 bg-liked-song-in-playlists-collection"
                        )}
                    >
                        <div className="flex-grow flex items-end">
                            <div className="line-clamp-3">
                                {savedTracks &&
                                    savedTracks.items.map(({ track: { artists, name, id } }, i) => (
                                        <React.Fragment key={id}>
                                            <span>{artists[0].name} </span>
                                            <span className="opacity-70 leading-relaxed">{name}</span>
                                            {i < savedTracks.items.length - 1 && (
                                                <span className="opacity-70"> • </span>
                                            )}
                                        </React.Fragment>
                                    ))}
                            </div>
                        </div>

                        <div className="min-h-[62px] leading-relaxed relative">
                            <h3 className="text-[2rem]">Liked Songs</h3>

                            {savedTracks?.total && <p className="text-sm">{savedTracks.total} liked songs</p>}

                            <PlayButton
                                size={3}
                                className={"absolute bottom-2 right-2 translate-y-1/2 opacity-0 duration-300"
                                    .concat(" transition-[transform,_opacity,_box-shadow]")
                                    .concat(" group-hover:translate-y-0 group-hover:opacity-100")
                                    .concat(" group-hover:shadow-playlist-card")}
                            />
                        </div>
                    </Link>

                    {playlists.items.map(playlist => (
                        <ItemCard
                            {...playlist}
                            description={playlist.description || `By ${playlist.owner.display_name}`}
                            key={playlist.id}
                            imageURL={playlist.images[0]?.url}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default PlaylistCollectionPage;
