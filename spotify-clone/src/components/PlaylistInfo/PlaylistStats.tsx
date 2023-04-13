import Link from "next/link";
import React from "react";

import { useNumberFormatter } from "../../hooks";
import Image from "next/image";

type PlaylistStatsProps = {
    owner: OwnerInfo;
    followersCount: number;
    tracksCount: number;

    ownerImageUrl?: string;
};

const PlaylistStats: React.FC<PlaylistStatsProps> = ({
    followersCount,
    owner,
    tracksCount,
    ownerImageUrl
}) => {
    const numberFormatter = useNumberFormatter();

    return (
        <div className="flex mt-2 text-sm items-center">
            <Link href={`/user/${owner.id}`} className="flex gap-1 items-center hover:underline">
                {ownerImageUrl && <Image src={ownerImageUrl} width={30} alt="owner avatar" height={30} className="h-6 w-6 rounded-full" />}
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
            </p>
        </div>
    );
};

export default PlaylistStats;
