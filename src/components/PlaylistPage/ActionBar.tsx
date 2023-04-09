import React, { useCallback, useEffect, useState } from "react";

import GoogleMaterialIcon from "../GoogleMaterialIcon";
import { useAppSelector } from "../../hooks";
import { Navigate, useParams } from "react-router-dom";
import {
    followPlaylist,
    isUserFollowsPlaylist as spotifyIsUserFollowsPlaylist,
    unfollowPlaylist
} from "../../spotifyApiWrapper";

const ActionBar: React.FC = () => {
    const { user, accessToken } = useAppSelector(state => state.auth);

    const { id: playlistId } = useParams<{ id: string }>();

    const [isUserFollowsPlaylist, setIsUserFollowsPlaylist] = useState(false);

    if (!user || !accessToken || !playlistId) {
        return <Navigate to='/' replace />;
    }

    const checkIfUserFollowsPlaylist = async () => {
        const res = await spotifyIsUserFollowsPlaylist(accessToken, playlistId, user.id);

        setIsUserFollowsPlaylist(res[0]);
    };

    const handleAddPlaylistToFavorite = useCallback(async () => {
        if (isUserFollowsPlaylist) {
            await unfollowPlaylist(accessToken, playlistId);
        } else {
            await followPlaylist(accessToken, playlistId);
        }

        await checkIfUserFollowsPlaylist();
    }, [isUserFollowsPlaylist]);

    useEffect(() => {
        checkIfUserFollowsPlaylist();
    }, []);

    return (
        <div className="px-[var(--content-spacing)] py-6 flex items-center gap-8">
            <button
                className={"h-14 w-14 rounded-full bg-[#1ed760] transition-[transform,_background-color]"
                    .concat(" flex items-center justify-center")
                    .concat(" hover:scale-105 active:bg-[#169c46] active:scale-100")}
            >
                <GoogleMaterialIcon iconName="play_arrow" FILL={1} size={2.2} className="text-black" />
            </button>

            <GoogleMaterialIcon
                iconName="favorite"
                size={2.4}
                FILL={isUserFollowsPlaylist ? 1 : 0}
                onClick={handleAddPlaylistToFavorite}
                className={"cursor-pointer transition-[color]"
                    .concat(" ", isUserFollowsPlaylist ?
                        "text-[#1ed760]" :
                        "text-[hsla(0,0%,100%,.7)] hover:text-white")
                }
            />
        </div>
    );
};

export default ActionBar;