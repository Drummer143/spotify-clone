import React from "react";
import { Link } from "react-router-dom";

import ItemCard from "../../ItemCard";
import { spotifyApi } from "../../../redux/query/spotifyApi";
import { useAppSelector } from "../../../hooks";

type CategoryPlaylistsCollectionProps = {
    id: string;
    name: string;
    lengthToDisplay: number;
};

const CategoryPlaylistsCollection: React.FC<CategoryPlaylistsCollectionProps> = ({ id, name, lengthToDisplay }) => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const { data: playlists } = spotifyApi.useGetCategoryPlaylistsQuery(
        {
            accessToken: accessToken || "",
            categoryId: id,
            searchParams: {
                limit: lengthToDisplay
            }
        },
        {
            skip: !accessToken
        }
    );

    if (!playlists) {
        return <></>;
    }

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <Link to={`/category/${id}`} className="text-2xl font-bold hover:underline">
                    {name}
                </Link>
                <Link to={`/category/${id}`} className="text-sm font-bold hover:underline text-[#b3b3b3]">
                    Show all
                </Link>
            </div>
            <div
                className={"grid gap-[var(--collection-gap)] grid-rows-1".concat(
                    " grid-cols-[repeat(var(--cards-count),_minmax(0,_1fr))]"
                )}
            >
                {playlists.playlists.items.slice(0, lengthToDisplay).map(playlist => (
                    <ItemCard
                        key={playlist.id}
                        id={playlist.id}
                        description={playlist.description}
                        imageURL={playlist.images[0].url}
                        name={playlist.name}
                        type={playlist.type}
                    />
                ))}
            </div>
        </section>
    );
};

export default CategoryPlaylistsCollection;
