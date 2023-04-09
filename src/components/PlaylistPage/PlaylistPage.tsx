import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaylistInfo from "./PlaylistInfo/PlaylistInfo";
import { useAppSelector } from "../../hooks";
import { getUser, getPlaylist as spotifyAPIGetPlaylist } from "../../spotifyApiWrapper";

const PlaylistPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const { id } = useParams<{ id: string }>();

    const [playlistInfo, setPlaylistInfo] = useState<GetPlayListResponse | undefined>();
    const [ownerImage, setOwnerImage] = useState<string | undefined>();
    const [playlistDuration, setPlaylistDuration] = useState(0);

    const parseDuration = (duration: number) => {
        const minutes = Math.floor(duration / 60) % 60;
        const hours = Math.floor(duration / 60 / 60);

        return {
            hours,
            minutes
        };
    };

    const getPlaylist = async (accessToken: string, id: string) => {
        const playlist = await spotifyAPIGetPlaylist(accessToken, id);

        document.title = `${playlist.name} | Spotify Playlist`;

        const { images: [{ url }] } = await getUser(accessToken, playlist.owner.id);

        let duration = playlist.tracks.items
            .reduce((prev, curr) => prev + curr.track.duration_ms, 0);

        duration = Math.round(duration / 1000);

        setPlaylistDuration(duration);

        setOwnerImage(url);
        setPlaylistInfo(playlist);
    };

    useEffect(() => {
        if (id && accessToken) {
            getPlaylist(accessToken, id);
        }
    }, []);

    if (!playlistInfo) {
        return (
            <div>loading...</div>
        );
    }

    return (
        <section>
            <PlaylistInfo
                description={playlistInfo.description}
                followersCount={playlistInfo.followers.total}
                imageUrl={playlistInfo.images[0].url}
                name={playlistInfo.name}
                owner={playlistInfo.owner}
                ownerImageUrl={ownerImage}
                playlistDuration={parseDuration(playlistDuration)}
                tracksCount={playlistInfo.tracks.total}
            />
            {id}
        </section>
    );
};

export default PlaylistPage;