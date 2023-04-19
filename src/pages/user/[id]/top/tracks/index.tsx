import Head from "next/head";
import { NextPage } from "next";
import { useEffect } from "react";

import { Loader, SongCard, SonglistHead } from "@/components";
import { changeHeadBGColor, spotifyApi } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";

const TopTrackPage: NextPage = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const currentUserName = useAppSelector(state => state.auth.currentUserInfo?.name);

    const [getTopTracks, { data: topTracks, isLoading, isError }] = spotifyApi.useLazyGetUserTopTracksQuery();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeHeadBGColor("authentificated"));
    }, [dispatch]);

    useEffect(() => {
        if (accessToken) {
            getTopTracks({ accessToken });
        }
    }, [accessToken, getTopTracks]);

    if (isLoading) {
        return <Loader />;
    }

    if (isError || !topTracks) {
        return <div>error</div>;
    }

    return (
        <>
        <Head>
            <title>{currentUserName} - Spotify Clone</title>
        </Head>

        <section className="pt-20">
            <h1 className="text-2xl font-bold mb-4 px-content-spacing">Top tracks this month</h1>

            <SonglistHead hiddenFields={{ dateAdded: true }} />

            <div className="px-content-spacing">
                {topTracks.items.map((track, i) => (
                    <SongCard
                        artists={track.artists}
                        duration={track.duration_ms}
                        imageURL={track.album.images[0]?.url}
                        name={track.name}
                        songId={track.id}
                        albumId={track.album.id}
                        albumName={track.album.name}
                        key={track.id}
                        number={i + 1}
                    />
                ))}
            </div>
        </section>
        </>
    );
};

export default TopTrackPage;