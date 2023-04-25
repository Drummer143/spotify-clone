import React from "react";

import UserAvatarPlaceholder from "./UserAvatarPlaceholder";
import ArtistImagePlaceholder from "./ArtistImagePlaceholder";
import PlaylistImagePlaceholder from "./PlaylistImagePlaceholder";

type ImagePlaceholderProps = JSX.IntrinsicElements["svg"] & {
    type: ItemType;
};

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ type, ...svgProps }) => {
    const selectImage = () => {
        switch (type) {
            case "playlist":
            case "track":
            case "album":
            case "episode":
            case "show":
                return <PlaylistImagePlaceholder {...svgProps} />;
            case "artist":
                return <ArtistImagePlaceholder {...svgProps} />;
            case "user":
            default:
                return <UserAvatarPlaceholder {...svgProps} />;
        }
    };

    return <div className="w-full h-full bg-[#282828] flex items-center justify-center">{selectImage()}</div>;
};

export default ImagePlaceholder;
