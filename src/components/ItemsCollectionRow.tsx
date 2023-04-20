import React from "react";

import { Grid, ItemCard } from ".";
import { createDescription } from "@/utils";

type ItemsCollectionRowProps = {
    items: PlaylistInfo[] | ArtistInfo[]
};

const ItemsCollectionRow: React.FC<ItemsCollectionRowProps> = ({
    items
}) => {
    return (
        <Grid className="grid-rows-1">
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
        </Grid>
    );
};

export default ItemsCollectionRow;
