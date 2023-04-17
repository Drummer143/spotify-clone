import React from "react";

type UserStatsProps = {
    countOfPlaylists?: number
    countOfFollowers?: number
    following?: number
    currentUser?: boolean
};

const UserStats: React.FC<UserStatsProps> = ({
    countOfFollowers,
    countOfPlaylists,
    following,
    currentUser
}) => {
    return (
        <p className="flex text-sm">
            {!!countOfPlaylists && <span>{countOfPlaylists}{currentUser ? " public" : ""} playlists</span>}
            {!!countOfPlaylists && (!!countOfFollowers || !!following) && <span className="mx-1">•</span>}

            {!!countOfFollowers && <span>{countOfFollowers} followers</span>}
            {!!countOfFollowers && following && <span className="mx-1">•</span>}

            {!!following && <span>{following} following</span>}
        </p>
    );
};

export default UserStats;