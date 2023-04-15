import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import ColorThief from "color-thief-ts";

type GenreCardProps = {
    category: CategoryInfo;
};

const GenreCard: React.FC<GenreCardProps> = ({ category }) => {
    const [colorDetector] = useState(new ColorThief());
    const [bgColor, setBgColor] = useState<string | undefined>();

    const getBgColor = useCallback(async () => {
        const color = await colorDetector.getColorAsync(category.icons[0].url);

        setBgColor(color.toString());
    }, [category.icons, colorDetector]);

    useEffect(() => {
        if (category) {
            getBgColor();
        }
    }, [category, getBgColor]);

    return (
        <Link
            href={`/genre/${category.id}`}
            key={category.id}
            className={"w-full aspect-square relative z-[0] rounded-lg overflow-hidden"}
            style={{
                backgroundColor: bgColor
            }}
        >
            <p className="text-white absolute bottom-0 z-[1] text-xl break-words w-full font-bold p-4">
                {category.name}
            </p>

            <Image
                width={128}
                height={128}
                alt="genre cover"
                src={`/api/image_proxy?uri=${category.icons[0].url}`}
                className={"absolute bottom-0 right-0 h-full w-full z-0".concat("")}
            />
        </Link>
    );
};

export default GenreCard;
