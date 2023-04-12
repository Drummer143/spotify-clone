import React from "react";
import { Link } from "react-router-dom";

type PlaylistStatsProps = {
    ownerDisplayName: string;
    ownerId: string

    tracksCount: number;

    ownerImageUrl?: string;
};

const PlaylistStats: React.FC<PlaylistStatsProps> = ({
    ownerDisplayName,
    ownerId,
    tracksCount,
    ownerImageUrl
}) => {
    return (
        <div className="flex mt-2 text-sm items-center">
            <Link to={`/user/${ownerId}`} className="flex gap-1 items-center hover:underline">
                {ownerImageUrl && <img src={ownerImageUrl} className="h-6 w-6 rounded-full" />}
                <p className="font-bold">{ownerDisplayName}</p>
            </Link>

            <span className="mx-1 text-base">•</span>

            <p>
                <span>{tracksCount} songs</span>
            </p>
        </div>
    );
};

export default PlaylistStats;
