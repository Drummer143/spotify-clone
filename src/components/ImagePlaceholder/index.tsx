import React from "react";

import UserAvatarPlaceholder from "./UserAvatarPlaceholder";
import PlaylistCoverPlaceholder from "./PlaylistCoverPlaceholder";
import ArtistPlaceholder from "./ArtistPlaceholder";

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
                return <PlaylistCoverPlaceholder {...svgProps} />;
            case "artist":
                return <ArtistPlaceholder {...svgProps} />;
            case "user":
            default:
                return <UserAvatarPlaceholder {...svgProps} />;
        }
    };

    return (
        <div className="w-full h-full bg-[#282828] flex items-center justify-center">
            {selectImage()}
        </div>
    );
};

export default ImagePlaceholder;
