import Head from "next/head";
import React, { useEffect } from "react";

import Link from "next/link";
import Loader from "@/components/Loader";
import ItemCard from "@/components/ItemCard";
import PlayButton from "@/components/PlayButton";
import { changeHeadBGColor, spotifyApi } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";

const PodcastsCollectionPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [getShows, { data: shows, isFetching: showsIsFetching }] = spotifyApi.useLazyGetCurrentUserSavedShowsQuery();
    const [getEpisodes, { data: episodes, isFetching: episodesIsFetching }] =
        spotifyApi.useLazyGetCurrentUserSavedEpisodesQuery();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (accessToken) {
            getShows({ accessToken });
            getEpisodes({ accessToken, searchParams: { limit: 10 } });
        }
    }, [accessToken, getEpisodes, getShows]);

    useEffect(() => {
        dispatch(changeHeadBGColor(["#121212", "#121212"]));
    });

    if (showsIsFetching || episodesIsFetching) {
        return <Loader />;
    }

    if (!shows) {
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
                        className={"group col-span-2 rounded-[clamp(4px,32px_*_0.025,8px)] flex flex-col gap-5"
                            .concat(" text-base p-5 bg-liked-episodes-in-playlists-collection")}
                    >
                        <div className="flex-grow flex items-end">
                            <div className="line-clamp-3 text-sm">
                                {episodes &&
                                    episodes.items.map(({ episode: { name, show, id } }, i) => (
                                        <React.Fragment key={id}>
                                            <span>{name} </span>
                                            <span className="opacity-70 leading-relaxed">{show?.name}</span>
                                            {i < episodes.items.length - 1 && <span className="opacity-70"> • </span>}
                                        </React.Fragment>
                                    ))}
                            </div>
                        </div>

                        <div className="min-h-[62px] leading-relaxed relative">
                            <h3 className="text-[2rem]">Your Songs</h3>

                            {episodes?.total && <p className="text-sm">{episodes.total} episodes</p>}

                            <PlayButton
                                size={3}
                                className={"absolute bottom-2 right-2 translate-y-1/2 opacity-0 duration-300"
                                    .concat(" transition-[transform,_opacity,_box-shadow]")
                                    .concat(" group-hover:translate-y-0 group-hover:opacity-100")
                                    .concat(" group-hover:shadow-playlist-card")}
                            />
                        </div>
                    </Link>

                    {shows.items.map(({ show }) => (
                        <ItemCard {...show} description={show.publisher} key={show.id} imageURL={show.images[0]?.url} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default PodcastsCollectionPage;
