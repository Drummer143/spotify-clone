import React, { useEffect, useState } from "react";
import ColorThief from "color-thief-ts";

import PlaylistStats from "./PlaylistStats";
import { changeHeadBGColor } from "../../../redux/slices/appState";
import { useAppDispatch, useAppSelector } from "../../../hooks";

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
    const bgColor = useAppSelector(state => state.app.headerBGColor[1]);

    const [colorDetector] = useState(new ColorThief());

    const dispatch = useAppDispatch();

    const getBGColor = async () => {
        const bgColor = await colorDetector.getColorAsync(imageUrl);

        const hex = bgColor.toString();

        dispatch(changeHeadBGColor([`${hex}00`, hex]));
    };

    useEffect(() => {
        getBGColor();
    }, [imageUrl]);

    return (
        <div
            className={"h-[30vh] min-h-[340px] max-h-[500px] transition-[background-color] duration-500 ease-in-out"
                .concat(" flex items-end px-[var(--content-spacing)] pb-6 gap-6")
                .concat(" ", styles.gradient)}
            style={{ backgroundColor: bgColor }}
        >
            <img className="w-48 h-48 shadow-playlist-cover-image" src={imageUrl} />
            <div
                className={"flex h-full flex-col justify-end"}
            >
                <p className="font-bold text-sm">Playlist</p>

                <div className="mt-2">
                    <h1
                        className="text-8xl font-bold tracking-tighter w-fit mt-[0.08em] mb-[0.12em]"
                    >
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