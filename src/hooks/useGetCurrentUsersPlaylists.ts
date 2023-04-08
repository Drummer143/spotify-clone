import { useCallback, useState } from "react";

import { useAppSelector } from "./reduxHooks";
import { getCurrentUserPlaylist } from "../spotifyApiWrapper";

export const useGetCurrentUsersPlaylists = (limit?: number, offset?: number): [() => Promise<void>, PlaylistInfo[] | null, boolean, unknown] => {
    const [error, setError] = useState<unknown>(null);
    const [playlists, setPlaylists] = useState<PlaylistInfo[] | null>(null);
    const [loading, setLoading] = useState(false);

    const accessToken = useAppSelector(state => state.auth.accessToken);

    const getPlaylists = useCallback(async () => {
        if (!accessToken) {
            setError("Can't get playlists without access token");
            return;
        }

        setLoading(true);

        try {
            const response = await getCurrentUserPlaylist(accessToken, limit, offset);

            setPlaylists(response.items);
        } catch (error) {
            setError(error);
        }

        setLoading(false);

    }, [accessToken, limit, offset]);

    return [getPlaylists, playlists, loading, error];
}