import React from "react";

import PlaylistStats from "./PlaylistStats";

import styles from "./PlaylistInfo.module.css";

type PlaylistInfoProps = {
    description: string
    imageUrl: string
    name: string
    owner: OwnerInfo
    followersCount: number
    tracksCount: number
    playlistDuration: PlaylistDuration

    ownerImageUrl?: string
};

const PlaylistInfo: React.FC<PlaylistInfoProps> = ({
    description,
    imageUrl,
    name,
    ...stats
}) => {
    return (
        <div
            className={"h-[40vh] min-h-[340px] bg-cover bg-no-repeat bg-[50%_15%] bg-scroll"}
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div
                className={"flex h-full pb-6 px-[var(--content-spacing)] flex-col justify-end"
                    .concat(" ", styles.gradient)}
            >
                <p className="font-bold text-sm">Playlist</p>

                <div className="mt-2">
                    <h1 className="text-8xl font-bold tracking-tighter w-fit mt-[0.08em] mb-[0.12em]">
                        {name}
                    </h1>
                </div>

                <p className="text-[hsla(0,0%,100%,.7)] text-sm">{description}</p>

                <PlaylistStats {...stats} />
            </div>
        </div>
    );
};

export default PlaylistInfo;