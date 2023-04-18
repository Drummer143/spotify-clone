import React from "react";
import ItemsCollectionRowHeadingLoader from "./ItemsCollectionRowHeadingLoader";
import ItemCardLoader from "./ItemCardLoader";

const ItemsCollectionRowLoader: React.FC = () => {
    return (
        <div>
            <ItemsCollectionRowHeadingLoader />

            <div className="flex justify-between gap-3.5 overflow-hidden mt-7">
                <ItemCardLoader />
                <ItemCardLoader />
                <ItemCardLoader />
                <ItemCardLoader />
                <ItemCardLoader />
                <ItemCardLoader />
            </div>
        </div>
    );
};

export default ItemsCollectionRowLoader;