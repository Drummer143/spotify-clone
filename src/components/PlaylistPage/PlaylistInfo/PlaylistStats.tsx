import React from "react";
import { Link } from "react-router-dom";

import { useNumberFormatter } from "../../../hooks";

type PlaylistStatsProps = {
    owner: OwnerInfo
    followersCount: number
    tracksCount: number
    playlistDuration: PlaylistDuration

    ownerImageUrl?: string
};

const PlaylistStats: React.FC<PlaylistStatsProps> = ({
    followersCount,
    owner,
    playlistDuration,
    tracksCount,
    ownerImageUrl
}) => {
    const numberFormatter = useNumberFormatter();

    return (
        <div className="flex mt-2 text-sm items-center">
            <Link
                to={`/user/${owner.id}`}
                className="flex gap-1 items-center hover:underline"
            >
                {ownerImageUrl && <img src={ownerImageUrl} className="h-6 w-6 rounded-full" />}
                <p className="font-bold">{owner.display_name}</p>
            </Link>

            {followersCount > 0 && (
                <>
                    <span className="mx-1 text-base">•</span>

                    <p>{numberFormatter.format(followersCount)} likes</p>
                </>
            )}

            <span className="mx-1 text-base">•</span>

            <p>
                <span>{tracksCount} songs</span>
                ,{" "}
                <span>
                    about {playlistDuration?.hours} hr {playlistDuration?.minutes} min
                </span>
            </p>
        </div>
    );
};

export default PlaylistStats;