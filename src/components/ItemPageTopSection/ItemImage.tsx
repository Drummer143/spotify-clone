import React from "react";
import Image from "next/image";

import EditImageSVG from "./EditImageSVG";
import ImagePlaceholder from "../ImagePlaceholder";
import { isURL } from "@/utils";

type ItemImageProps = {
    type: ItemType

    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    imageURL?: string;
    editable?: boolean;
    cacheImage?: boolean;
};

const ItemImage: React.FC<ItemImageProps> = ({ imageURL, className, editable, onClick, cacheImage = true, type }) => {
    return (
        <div
            className={"group z-0 relative shadow-playlist-cover-image overflow-hidden"
                .concat(" ", ["user", "artist"].includes(type) ? "rounded-full" : "")
                .concat(className ? ` ${className}` : "")}
        >
            {imageURL ? (
                <Image
                    width={192}
                    height={192}
                    alt="cover image"
                    className="w-full h-full"
                    src={cacheImage && isURL(imageURL) ? `/api/image_proxy?uri=${imageURL}` : imageURL}
                />
            ) : (
                <div className="w-full h-full bg-[#282828] flex items-center justify-center">
                    <ImagePlaceholder width={48} height={48} fill="#7f7f7f" type="playlist" className="hover:hidden" />
                </div>
            )}

            {editable && (
                <button
                    onClick={onClick}
                    type="button"
                    className={"w-full h-full absolute top-0 left-0 z-[1] items-center justify-center hidden"
                        .concat(" text-white flex-col gap-1")
                        .concat(" ", imageURL ? "bg-[rgba(0,0,0,.7)]" : "bg-[#282828]")
                        .concat(" group-hover:flex")}
                >
                    <EditImageSVG fill="currentColor" className="mt-7" />
                    <p>Edit {type}</p>
                </button>
            )}
        </div>
    );
};

export default ItemImage;
