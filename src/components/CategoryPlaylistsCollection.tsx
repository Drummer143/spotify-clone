import React from "react";
import Link from "next/link";

import { ItemCard } from ".";
import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";

type CategoryPlaylistsCollectionProps = {
    id: string;
    name: string;
};

const CategoryPlaylistsCollection: React.FC<CategoryPlaylistsCollectionProps> = ({ id, name }) => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const countOfCardsInColumn = useAppSelector(state => state.app.countOfCardsInColumn);

    const { data: playlists } = spotifyApi.useGetCategoryPlaylistsQuery(
        {
            accessToken: accessToken || "",
            categoryId: id,
            searchParams: {
                limit: countOfCardsInColumn
            }
        },
        {
            skip: !accessToken
        }
    );

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <Link href={`/genre/${id}`} className="text-2xl font-bold hover:underline">
                    {name}
                </Link>
                <Link href={`/genre/${id}`} className="text-sm font-bold hover:underline text-[#b3b3b3]">
                    Show all
                </Link>
            </div>

            <div className="grid gap-dynamic grid-cols-dynamic grid-rows-1">
                {playlists &&
                    playlists.playlists.items
                        .slice(0, countOfCardsInColumn)
                        .map(playlist => (
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
