import React from "react";

import { Grid, ItemCard } from ".";
import { createDescription } from "@/utils";

type CategorySearchResultsProps = {
    result: NonNullable<SearchForItemResponse[Exclude<keyof SearchForItemResponse, "tracks">]>;
    heading: Exclude<keyof SearchForItemResponse, "tracks">;

    countOfCards?: number;
};

const CategorySearchResults: React.FC<CategorySearchResultsProps> = ({ heading, result, countOfCards = 2 }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 mt-[var(--collection-gap)] first-letter:uppercase">{heading}</h2>

            <Grid className="grid-rows-1">
                {result.items.slice(0, countOfCards).map(item => (
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        description={createDescription(item)}
                        imageURL={item.images[0]?.url}
                    />
                ))}
            </Grid>
        </div>
    );
};

export default CategorySearchResults;
