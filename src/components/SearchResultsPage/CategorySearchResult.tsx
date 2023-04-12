import React, { useEffect, useState } from "react";

import ItemCard from "../ItemCard";
import ListingOfAuthors from "../ListingOfAuthors";
import GoogleMaterialIcon from "../GoogleMaterialIcon";
import moment from "moment";

type CategorySearchResultProps = {
    result: NonNullable<SearchForItemResponse[Exclude<keyof SearchForItemResponse, "tracks">]>
    heading: Exclude<keyof SearchForItemResponse, "tracks">

    countOfCards?: number
};

const CategorySearchResult: React.FC<CategorySearchResultProps> = ({ heading, result, countOfCards = 2 }) => {
    const createDescription = (item: ArtistInfo | AlbumInfo | PlaylistInfo | ShowInfo | EpisodeInfo) => {
        switch (item.type) {
            case "album": {
                return (
                    <>
                        <span className="text-inherit">{new Date(item.release_date).getFullYear()}</span>
                        <ListingOfAuthors artists={item.artists} />
                    </>
                );
            }
            case "artist": return "Artist";
            case "episode": {
                return (
                    <div className="line-clamp-1">
                        <span>{item.explicit && <GoogleMaterialIcon iconName="explicit" />}</span>
                        <span>{moment(item.release_date).format("MMM YYYY")}</span>
                        <span>{Math.round(item.duration_ms / 1000 / 60)} min</span>
                    </div>
                );
            }
            case "playlist": return item.description;
            case "show": return item.description;
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 mt-[var(--collection-gap)] first-letter:uppercase">
                {heading}
            </h2>

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