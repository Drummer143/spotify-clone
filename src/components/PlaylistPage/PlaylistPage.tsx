import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ActionBar from "./ActionBar";
import PlaylistInfo from "./PlaylistInfo/PlaylistInfo";
import { setTitle } from "../../redux/slices/appState";
import { spotifyApi } from "../../redux/query/spotifyApi";
import { useAppDispatch, useAppSelector } from "../../hooks";

const PlaylistPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const [playlistDuration, setPlaylistDuration] = useState(0);

    const parseDuration = (duration: number) => {
        const minutes = Math.floor(duration / 60) % 60;
        const hours = Math.floor(duration / 60 / 60);

        return {
            hours,
            minutes
        };
    };

    const { data: playlistInfo } = spotifyApi.useGetPlaylistQuery({
        accessToken: accessToken || "",
        playlistId: id || ""
    }, {
        refetchOnMountOrArgChange: true,
        skip: !accessToken
    });

    const { data: ownerInfo } = spotifyApi.useGetUserQuery({
        accessToken: accessToken || "",
        userId: playlistInfo?.owner.id || ""
    }, {
        refetchOnMountOrArgChange: true,
        skip: !accessToken || !playlistInfo
    });

    useEffect(() => {
        if (!playlistInfo) {
            return;
        }

        dispatch(setTitle(`${playlistInfo.name} | Spotify Clone`));

        let duration = playlistInfo.tracks.items
            .reduce((prev, curr) => prev + curr.track.duration_ms, 0);

        duration = Math.round(duration / 1000);

        setPlaylistDuration(duration);
    }, [playlistInfo]);

    if (!playlistInfo) {
        return (
            <div>loading...</div>
        );
    }

    return (
        <section
            className="max-h-full"
        >
            <PlaylistInfo
                description={playlistInfo.description}
                followersCount={playlistInfo.followers.total}
                imageUrl={playlistInfo.images[0].url}
                name={playlistInfo.name}
                owner={playlistInfo.owner}
                ownerImageUrl={ownerInfo?.images[0]?.url}
                playlistDuration={parseDuration(playlistDuration)}
                tracksCount={playlistInfo.tracks.total}
            />

            <ActionBar />
            {id}

            <div className="h-[200vh]"></div>
        </section>
    );
};

export default PlaylistPage;