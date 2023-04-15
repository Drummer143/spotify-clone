import React from "react";
import { useRouter } from "next/router";

import PlayButton from "./PlayButton";
import Image from "next/image";

type ItemCardProps = {
    type: ItemType;
    id: string;
    name: string;

    description?: string | React.ReactNode;
    imageURL?: string;
};

const ItemCard: React.FC<ItemCardProps> = ({ type, id, imageURL, description, name }) => {
    const router = useRouter();

    const handleClick: React.MouseEventHandler = () => router.push({ pathname: `/${type}/${id}` });

    return (
        <div
            onClick={handleClick}
            className={"group p-4 bg-[#181818] rounded-[clamp(4px,32px_*_0.025,8px)] transition-[background-color]"
                .concat(" cursor-pointer")
                .concat(" hover:bg-[#282828]")}
        >
            <div className="relative w-full aspect-square overflow-hidden mb-4">
                {imageURL && (
                    <Image
                        width={200}
                        height={200}
                        alt={`${type} image`}
                        src={`/api/image_proxy?uri=${imageURL}`}
                        className={"w-full aspect-square".concat(
                            " ",
                            type === "artist" ? "rounded-full" : "rounded-[clamp(4px,32px_*_0.025,8px)]"
                        )}
                    />
                )}

                {type !== "episode" && type !== "show" && (
                    <PlayButton
                        size={3}
                        className={"absolute bottom-2 right-2 translate-y-1/2 opacity-0 duration-300"
                            .concat(" transition-[transform,_opacity,_box-shadow]")
                            .concat(" group-hover:translate-y-0 group-hover:opacity-100")
                            .concat(" group-hover:shadow-playlist-card")}
                    />
                )}
            </div>

            <h3 className="font-bold text-base mb-1 truncate">{name}</h3>

            {description && <div className="text-[#a7a7a7] text-sm line-clamp-2">{description}</div>}
        </div>
    );
};

export default ItemCard;
