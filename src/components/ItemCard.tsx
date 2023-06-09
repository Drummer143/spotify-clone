import React from "react";
import { useRouter } from "next/router";

import { PlayButton, ImageWrapper } from ".";
import { getPlaylist, setPaused } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";

type ItemCardProps = {
    type: Exclude<ItemType, "track">;
    id: string;
    name: string;

    description?: string | React.ReactNode;
    imageURL?: string;
};

type PlaylistLikeItemTypes = Exclude<ItemType, "episode" | "show" | "user">;

const isPlayable = (type: ItemType): type is PlaylistLikeItemTypes => !["episode", "show", "user"].includes(type);

const ItemCard: React.FC<ItemCardProps> = ({ type, id, imageURL, description, name }) => {
    const { playlistInfo, paused } = useAppSelector(state => state.player);

    const router = useRouter();

    const handleClick: React.MouseEventHandler = () => router.push({ pathname: `/${type}/${id}` });

    const handleMouseEnter = () => router.prefetch(`/${type}/${id}`);

    const dispatch = useAppDispatch();

    const handlePlayButtonClick = (e: React.MouseEvent<HTMLButtonElement>, type: PlaylistLikeItemTypes) => {
        e.stopPropagation();

        if (playlistInfo?.id !== id) {
            dispatch(getPlaylist({ id, type: type }));
        } else {
            dispatch(setPaused());
        }
    };

    return (
        <div
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            className={"group p-4 bg-[#181818] rounded-[clamp(4px,32px_*_0.025,8px)] transition-[background-color]"
                .concat(" cursor-pointer")
                .concat(" hover:bg-[#282828]")}
        >
            <div className="relative w-full aspect-square overflow-hidden mb-4">
                <ImageWrapper
                    type={type}
                    imageURL={imageURL}
                    proxy
                    imageClassName={"w-full aspect-square".concat(
                        " ",
                        type === "artist" ? "rounded-full" : "rounded-[clamp(4px,32px_*_0.025,8px)]"
                    )}
                />

                {isPlayable(type) && (
                    <PlayButton
                        onClick={e => handlePlayButtonClick(e, type)}
                        size={3}
                        icon={playlistInfo?.id === id && !paused ? "pause" : "play_arrow"}
                        className={"absolute bottom-2 right-2 duration-300 transition-[transform,_opacity,_box-shadow]"
                            .concat(" ", playlistInfo?.id === id && !paused
                                ? "shadow-playlist-card"
                                : "translate-y-[20%] opacity-0 group-hover:translate-y-0"
                                    .concat(" group-hover:opacity-100 group-hover:shadow-playlist-card")
                            )
                        }
                    />
                )}
            </div>

            <h3 className="font-bold text-base mb-1 truncate">{name}</h3>

            {description && <div className="text-[#a7a7a7] text-sm line-clamp-2">{description}</div>}
        </div>
    );
};

export default ItemCard;
