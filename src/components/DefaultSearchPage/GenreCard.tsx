import React, { useEffect, useState } from "react";
import ColorThief from "color-thief-ts";
import { Link } from "react-router-dom";

type GenreCardProps = {
    category: CategoryInfo;
};

const GenreCard: React.FC<GenreCardProps> = ({ category }) => {
    const [colorDetector] = useState(new ColorThief());
    const [bgColor, setBgColor] = useState<string | undefined>();

    const getBgColor = async () => {
        const color = await colorDetector.getColorAsync(category.icons[0].url);

        setBgColor(color.toString());
    };

    useEffect(() => {
        if (category) {
            getBgColor();
        }
    }, [category]);

    return (
        <Link
            to={`/genre/${category.id}`}
            key={category.id}
            className={"w-full aspect-square relative rounded-lg overflow-hidden"}
            style={{
                backgroundColor: bgColor
            }}
        >
            <p className="text-white absolute bottom-0 z-[1] text-xl break-words w-full font-bold p-4">
                {category.name}
            </p>
            <img src={category.icons[0].url} className={"absolute bottom-0 right-0 h-full w-full z-0".concat("")} />
        </Link>
    );
};

export default GenreCard;
