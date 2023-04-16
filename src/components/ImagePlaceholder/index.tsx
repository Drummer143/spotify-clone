import React from "react";

import UserAvatarPlaceholder from "./UserAvatarPlaceholder";
import PlaylistCoverPlaceHolder from "./PlaylistCoverPlaceHolder";

type ImagePlaceholderProps = JSX.IntrinsicElements["svg"] & {
    type: ItemType;
};

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ type, ...svgProps }) => {
    switch (type) {
        case "playlist":
        case "track":
        case "album":
        case "episode":
        case "show":
            return <PlaylistCoverPlaceHolder {...svgProps} />;
        case "artist":
        case "user":
        default:
            return <UserAvatarPlaceholder {...svgProps} />;
    }
};

export default ImagePlaceholder;
