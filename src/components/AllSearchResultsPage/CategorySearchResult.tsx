import React from "react";

import ItemCard from "../ItemCard";
import { createDescription } from "../../utils";

type CategorySearchResultProps = {
    result: NonNullable<SearchForItemResponse[Exclude<keyof SearchForItemResponse, "tracks">]>;
    heading: Exclude<keyof SearchForItemResponse, "tracks">;

    countOfCards?: number;
};

const CategorySearchResult: React.FC<CategorySearchResultProps> = ({ heading, result, countOfCards = 2 }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 mt-[var(--collection-gap)] first-letter:uppercase">{heading}</h2>

            <div
                className={"grid grid-cols-[repeat(var(--cards-count),_minmax(0,_1fr))] grid-rows-1"
                    .concat(" gap-[var(--collection-gap)]")}
            >
                {result.items.slice(0, countOfCards).map(item => (
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        description={createDescription(item)}
                        imageURL={item.images[0].url}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategorySearchResult;
