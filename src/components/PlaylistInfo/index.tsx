import React, { useCallback, useEffect, useRef, useState } from "react";
import ColorThief from "color-thief-ts";
import { useRouter } from "next/router";

import PlaylistStats from "./PlaylistStats";
import PlaylistCover from "./PlaylistCover";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { changeHeadBGColor, setCurrentModal } from "@/redux";

import styles from "@/styles/PlaylistInfo.module.css";

type PlaylistInfoProps = {
    tracksCount: number;
    ownerId: string;
    ownerDisplayName: string;
    name: string;

    imageUrl?: string;
    description?: string;
    followersCount?: number;
    ownerImageUrl?: string;
};

const PlaylistInfo: React.FC<PlaylistInfoProps> = ({ description, imageUrl, name, ...otherProps }) => {
    const bgColor = useAppSelector(state => state.app.headerBGColor[1]);
    const currentUserId = useAppSelector(state => state.auth.currentUserId);

    const [colorDetector] = useState(new ColorThief());

    const dispatch = useAppDispatch();

    const { asPath } = useRouter();

    const containerRef = useRef<HTMLDivElement>(null);
    const playlistNameRef = useRef<HTMLHeadingElement>(null);

    const updateHeaderBGColor = useCallback(
        async (imageURL?: string) => {
            if (imageURL) {
                const bgColor = await colorDetector.getColorAsync(imageURL);

                const hex = bgColor.toString();

                dispatch(changeHeadBGColor([`${hex}00`, hex]));
            } else {
                dispatch(changeHeadBGColor("authentificated"));
            }
        },
        [colorDetector, dispatch]
    );

    const handleOpenModal = () => dispatch(setCurrentModal("playlist"));

    useEffect(() => {
        updateHeaderBGColor(imageUrl);
    }, [imageUrl, updateHeaderBGColor]);

    return (
        <>
            <div
                className={"h-[30vh] min-h-[340px] max-h-[500px] transition-[background-color] duration-500 ease-in-out"
                    .concat(" flex items-end px-[var(--content-spacing)] pb-6 gap-6")
                    .concat(" ", styles.gradient)}
                style={{ backgroundColor: bgColor }}
            >
                <PlaylistCover
                    onClick={handleOpenModal}
                    className="w-48 h-48"
                    imageURL={imageUrl}
                    editable={!asPath.includes("collection") && currentUserId === otherProps.ownerId}
                />

                <div ref={containerRef} className={"flex h-full flex-col justify-end"}>
                    <p className="font-bold text-sm">Playlist</p>

                    <div className="mt-2">
                        <h1
                            ref={playlistNameRef}
                            className={"font-bold tracking-tighter w-fit mt-[0.08em] mb-[0.12em] line-clamp-1".concat(
                                " text-[calc((100vw_-_30rem)/(80_-_30)_*_(1.5_-_1)_+_2rem)]"
                            )}
                        >
                            {name}
                        </h1>
                    </div>

                    <p className="text-[hsla(0,0%,100%,.7)] text-sm">{description}</p>

                    <PlaylistStats {...otherProps} />
                </div>
            </div>
        </>
    );
};

export default PlaylistInfo;
