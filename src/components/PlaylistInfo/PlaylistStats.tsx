import Link from "next/link";
import React from "react";
import Image from "next/image";

import { useNumberFormatter } from "@/hooks";

type PlaylistStatsProps = {
    ownerDisplayName: string;
    ownerId: string;
    tracksCount: number;

    followersCount?: number;
    ownerImageUrl?: string;
};

const PlaylistStats: React.FC<PlaylistStatsProps> = ({
    followersCount,
    ownerDisplayName,
    ownerId,
    tracksCount,
    ownerImageUrl
}) => {
    const numberFormatter = useNumberFormatter();

    return (
        <div className="flex mt-2 text-sm items-center">
            <Link href={`/user/${ownerId}`} className="flex gap-1 items-center hover:underline">
                {ownerImageUrl && (
                    <Image
                        src={`/api/image_proxy?uri=${ownerImageUrl}`}
                        width={30}
                        height={30}
                        alt="owner avatar"
                        className="h-6 w-6 rounded-full"
                    />
                )}

                <p className="font-bold">{ownerDisplayName}</p>
            </Link>

            {!!followersCount && (
                <>
                    <span className="mx-1 text-base">•</span>

                    <p>{numberFormatter.format(followersCount)} likes</p>
                </>
            )}

            {!!(followersCount && tracksCount) && <span className="mx-1 text-base">•</span>}

            {!!tracksCount && (
                <p>
                    <span>{tracksCount} songs</span>
                </p>
            )}
        </div>
    );
};

export default PlaylistStats;
