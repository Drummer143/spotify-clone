import React, { useRef } from "react";

import PlaylistCover from "../ItemPageTopSection/ItemImage";

type ImageInputProps = {
    setCurrentCover: React.Dispatch<React.SetStateAction<string | undefined>>;
    type: ItemType;

    currentCover?: string;
    isNewImage?: boolean;
};

const ImageInput: React.FC<ImageInputProps> = ({ setCurrentCover, currentCover, isNewImage, type }) => {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleSelectImage: React.MouseEventHandler<HTMLButtonElement> = () => imageInputRef.current?.click();
    const handleDeleteCover: React.MouseEventHandler<HTMLButtonElement> = () => setCurrentCover(undefined);

    const handleImageInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        if (e.target.files) {
            setCurrentCover(URL.createObjectURL(e.target.files[0]));
            e.target.value = "";
        }
    };

    return (
        <div className="group row-span-2 relative">
            {currentCover && (
                <button
                    type="button"
                    onClick={handleDeleteCover}
                    className={"absolute bg-[#282828] top-0 right-0 z-[1] text-xs opacity-70 px-1 py-0.5".concat(
                        "  rounded-bl-sm hidden group-hover:block hover:opacity-100"
                    )}
                >
                    Remove image
                </button>
            )}

            <input
                ref={imageInputRef}
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className="hidden"
                multiple={false}
                onChange={handleImageInputChange}
            />

            <PlaylistCover
                onClick={handleSelectImage}
                type={type}
                imageURL={currentCover}
                className="h-full w-full"
                editable
                cacheImage={isNewImage}
            />
        </div>
    );
};

export default ImageInput;
