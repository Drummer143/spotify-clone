import React, { useEffect } from "react";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";

type UserFollowButtonProps = {
    targetId: string;
    type: "user" | "artist";
};

const UserFollowButton: React.FC<UserFollowButtonProps> = ({ targetId, type }) => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [checkFollow, { currentData: followInfo }] = spotifyApi.useLazyCheckIfUserFollowsUsersQuery();
    const [followUser] = spotifyApi.useFollowUsersMutation();
    const [unfollowUser] = spotifyApi.useUnFollowUsersMutation();

    const toggleFollow = () => {
        if (!followInfo || !accessToken) {
            return;
        }

        if (followInfo[0]) {
            unfollowUser({ accessToken, searchParams: { ids: [targetId], type: type } });
        } else {
            followUser({ accessToken, searchParams: { ids: [targetId], type: type } });
        }
    };

    useEffect(() => {
        if (accessToken) {
            checkFollow({ accessToken, searchParams: { type: type, ids: [targetId] } });
        }
    }, [accessToken, checkFollow, targetId, type]);

    return (
        <button
            className={"px-4 py-2 text-xs font-bold rounded border border-solid uppercase tracking-[.1em]".concat(
                " ",
                followInfo && followInfo[0]
                    ? "border-white"
                    : " border-[hsla(0,0%,100%,.3)] transition-[border-color] hover:border-white"
            )}
            onClick={toggleFollow}
        >
            Follow{followInfo && followInfo[0] ? "ing" : ""}
        </button>
    );
};

export default UserFollowButton;
