import Image from "next/image";
import Link from "next/link";
import React from "react";

type AlbumStatsProps = {
    ownerDisplayName: string;
    releaseDate: string;
    ownerId: string;

    totalSongs?: number;
    ownerImageURL?: string;
};

const AlbumStats: React.FC<AlbumStatsProps> = ({
    ownerId,
    ownerDisplayName,
    releaseDate,
    totalSongs,
    ownerImageURL
}) => {
    return (
        <div className="flex mt-2 text-sm items-center">
            <Link href={`/artist/${ownerId}`} className="flex gap-1 items-center hover:underline">
                {ownerImageURL && (
                    <Image
                        src={`/api/image_proxy?uri=${ownerImageURL}`}
                        width={30}
                        height={30}
                        alt="owner avatar"
                        className="h-6 w-6 rounded-full"
                    />
                )}

                <span className="font-bold">{ownerDisplayName}</span>
            </Link>

            <span className="mx-1 text-base">•</span>

            <span>{new Date(releaseDate).getFullYear()}</span>

            {!!totalSongs && (
                <>
                    <span className="mx-1 text-base">•</span>

                    <span>{totalSongs} songs</span>
                </>
            )}
        </div>
    );
};

export default AlbumStats;
