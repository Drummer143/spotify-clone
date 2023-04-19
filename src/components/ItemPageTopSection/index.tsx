import React, { useCallback, useEffect, useRef, useState } from "react";
import ColorThief from "color-thief-ts";
import { useRouter } from "next/router";

import ItemImage from "./ItemImage";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { changeHeadBGColor, setCurrentModal } from "@/redux";

import styles from "@/styles/ItemPageTopSection.module.css";

type ItemPageTopSectionProps = {
    type: ItemType;
    ownerId: string;
    name: string;

    children?: React.ReactNode;
    imageUrl?: string;
    description?: string;
};

const ItemPageTopSection: React.FC<ItemPageTopSectionProps> = ({
    description,
    imageUrl,
    name,
    type,
    ownerId,
    children
}) => {
    const bgColor = useAppSelector(state => state.app.headerBGColor[1]);
    const currentUserId = useAppSelector(state => state.auth.currentUserInfo?.id);

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
                <ItemImage
                    type={type}
                    onClick={handleOpenModal}
                    className="w-48 h-48 xl:w-[14.5rem] xl:h-[14.5rem]"
                    imageURL={imageUrl}
                    editable={!asPath.includes("collection") && currentUserId === ownerId}
                />

                <div ref={containerRef} className={"flex h-full flex-col justify-end"}>
                    <p className="font-bold text-sm first-letter:uppercase">{type}</p>

                    <h1
                        ref={playlistNameRef}
                        className={"tracking-tighter w-fit mt-[calc(0.08em+0.5rem)] mb-[calc(0.12em+0.5rem)]"
                            .concat(" font-bold line-clamp-1 text-[calc((100vw-30rem)/(80-30)*(1.5-1)+2rem)]")}
                    >
                        {name}
                    </h1>

                    <p className="text-[hsla(0,0%,100%,.7)] text-sm">{description}</p>

                    {children}
                </div>
            </div>
        </>
    );
};

export default ItemPageTopSection;
