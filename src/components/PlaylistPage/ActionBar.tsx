import React, { useCallback } from "react";

import PlayButton from "../PlayButton";
import GoogleMaterialIcon from "../GoogleMaterialIcon";
import { useParams } from "react-router-dom";
import { spotifyApi } from "../../redux/query/spotifyApi";
import { useAppSelector } from "../../hooks";

const ActionBar: React.FC = () => {
    const {
        auth: { accessToken = "" },
        app: { headerBGColor }
    } = useAppSelector(state => state);

    const { id: playlistId = "" } = useParams<{ id: string }>();

    const [unfollowPlaylist] = spotifyApi.useUnfollowPlaylistMutation();
    const [followPlaylist] = spotifyApi.useFollowPlaylistMutation();
    const { currentData: user } = spotifyApi.useGetCurrentUserQuery(accessToken, {
        skip: !accessToken
    });
    const { data: followInfo } = spotifyApi.useIsUserFollowsPlaylistQuery(
        {
            accessToken: accessToken,
            playlistId: playlistId,
            usersIds: user?.id || ""
        },
        {
            skip: !playlistId || !accessToken || !user
        }
    );

    const handleAddPlaylistToFavorite = useCallback(() => {
        if (!playlistId || !accessToken) {
            return;
        }

        if (followInfo && followInfo[0]) {
            unfollowPlaylist({ accessToken, playlistId });
        } else {
            followPlaylist({ accessToken, playlistId });
        }
    }, [followInfo]);

    return (
        <div className="relative z-[0]">
            <div
                style={{ backgroundColor: headerBGColor[1] }}
                className={"absolute top-0 z-[-1] bg-action-bar-gradient h-[14.5rem] w-full"
                    .concat(" transition-[background-color] duration-500 pointer-events-none")}
            />

            <div className="px-[var(--content-spacing)] py-6 bg-transparent flex items-center gap-8">
                <PlayButton />

                <GoogleMaterialIcon
                    iconName="favorite"
                    size={2.4}
                    FILL={followInfo && followInfo[0] ? 1 : 0}
                    onClick={handleAddPlaylistToFavorite}
                    className={"cursor-pointer transition-[color]"
                        .concat(" ", followInfo && followInfo[0] ?
                            "text-[#1ed760]" :
                            "text-[hsla(0,0%,100%,.7)] hover:text-white")
                    }
                />
            </div>
        </div>
    );
};

export default ActionBar;
