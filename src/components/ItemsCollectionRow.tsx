import React from "react";

import { ItemCard } from ".";
import { createDescription } from "@/utils";

type ItemsCollectionRowProps = {
    items: PlaylistInfo[] | ArtistInfo[]
};

const ItemsCollectionRow: React.FC<ItemsCollectionRowProps> = ({
    items
}) => {
    return (
        <div className="grid gap-dynamic grid-cols-dynamic grid-rows-1">
            {items.map(item => (
                <ItemCard
                    key={item.id}
                    id={item.id}
                    description={createDescription(item)}
                    imageURL={item?.images[0]?.url}
                    name={item.name}
                    type={item.type}
                />
            ))}
        </div>
    );
};

export default ItemsCollectionRow;
