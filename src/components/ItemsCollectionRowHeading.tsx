import Link from "next/link";
import React from "react";

type ItemsCollectionRowHeadingProps = {
    heading: string
    hrefToFullCollection: string
};

const ItemsCollectionRowHeading: React.FC<ItemsCollectionRowHeadingProps> = ({
    heading,
    hrefToFullCollection
}) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <Link href={hrefToFullCollection} className="text-2xl font-bold first-letter:uppercase hover:underline">
                {heading}
            </Link>
            <Link href={hrefToFullCollection} className="text-sm font-bold hover:underline text-[#b3b3b3]">
                Show all
            </Link>
        </div>
    );
};

export default ItemsCollectionRowHeading;