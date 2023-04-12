import React, { useEffect } from "react";

import Tracklist from "./Tracklist";
import ActionBar from "./ActionBar";
import PlaylistInfo from "./PlaylistInfo/PlaylistInfo";
import { setTitle } from "../../redux/slices/appState";
import { spotifyApi } from "../../redux/query/spotifyApi";
import { useAppDispatch, useAppSelector } from "../../hooks";

const LikedSongsPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();

    const [getSavedTracks, { currentData: savedTracks, error }] = spotifyApi.useLazyGetCurrentUserSavedTracksQuery();

    useEffect(() => {
        dispatch(setTitle("Spotify Clone - Liked Songs"));
    }, []);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        getSavedTracks({ accessToken });
    }, [accessToken]);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    if (!savedTracks) {
        return <div>loading...</div>;
    }

    return (
        <section className="max-h-full">
            <PlaylistInfo tracksCount={savedTracks.total} />

            <ActionBar />

            <Tracklist tracks={savedTracks.items} />
        </section>
    );
};

export default LikedSongsPage;
