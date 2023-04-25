import React from "react";
import Image from "next/image";

import { ImagePlaceholder } from ".";

type ImageWrapperProps = {
    type: ItemType;

    width?: number;
    height?: number;
    imageURL?: string;
    imageClassName?: string;
    placeholderClassName?: string;
    proxy?: boolean;
};

const ImageWrapper: React.FC<ImageWrapperProps> = ({
    imageURL,
    type,
    height = 200,
    width = 200,
    placeholderClassName,
    imageClassName,
    proxy
}) => {
    if (imageURL) {
        return (
            <Image
                width={width}
                height={height}
                alt={`${type} image`}
                src={proxy ? `/api/image_proxy?uri=${imageURL}` : imageURL}
                className={imageClassName}
            />
        );
    }

    return (
        <ImagePlaceholder
            fill="#7f7f7f"
            width={48}
            height={48}
            type={type}
            className={"max-w-[48px] aspect-square w-[25%]".concat(
                placeholderClassName ? ` ${placeholderClassName}` : ""
            )}
        />
    );
};

export default ImageWrapper;
