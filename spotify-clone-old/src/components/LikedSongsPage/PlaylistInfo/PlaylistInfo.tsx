import React, { useEffect, useRef, useState } from "react";
import ColorThief from "color-thief-ts";

import PlaylistStats from "./PlaylistStats";
import { changeHeadBGColor } from "../../../redux/slices/appState";
import { useAppDispatch, useAppSelector } from "../../../hooks";

import styles from "./PlaylistInfo.module.css";
import { spotifyApi } from "../../../redux/query/spotifyApi";

type PlaylistInfoProps = {
    // description: string;
    // imageUrl: string;
    // name: string;
    // owner: OwnerInfo;
    // followersCount: number;
    tracksCount: number;
    // playlistDuration: PlaylistDuration;

    // ownerImageUrl?: string;
};

const imageUrl = "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png";

const PlaylistInfo: React.FC<PlaylistInfoProps> = ({ tracksCount }) => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const bgColor = useAppSelector(state => state.app.headerBGColor[1]);

    const [colorDetector] = useState(new ColorThief());

    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const playlistNameRef = useRef<HTMLHeadingElement>(null);

    const [getCurrentUser, { data: user }] = spotifyApi.useLazyGetCurrentUserQuery();

    const getBGColor = async () => {
        const bgColor = await colorDetector.getColorAsync(imageUrl);

        const hex = bgColor.toString();

        dispatch(changeHeadBGColor([`${hex}00`, hex]));
    };

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        getCurrentUser(accessToken);
    }, [accessToken]);

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
            <div ref={containerRef} className={"flex h-full flex-col justify-end"}>
                <p className="font-bold text-sm">Playlist</p>

                <div className="mt-2">
                    <h1
                        ref={playlistNameRef}
                        className={"font-bold tracking-tighter w-fit mt-[0.08em] mb-[0.12em] line-clamp-1".concat(
                            " text-[calc((100vw_-_30rem)/(80_-_30)_*_(1.5_-_1)_+_2rem)]"
                        )}
                    >
                        Liked Songs
                    </h1>
                </div>

                {user && (
                    <PlaylistStats
                        ownerDisplayName={user?.display_name}
                        ownerId={user?.id}
                        tracksCount={tracksCount}
                    />
                )}
            </div>
        </div>
    );
};

export default PlaylistInfo;
