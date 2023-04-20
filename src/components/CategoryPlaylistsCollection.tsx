import React from "react";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { ItemsCollectionRow, ItemsCollectionRowHeading } from ".";

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
        <>
            {!!playlists?.playlists.items.length && (
                <section>
                    <ItemsCollectionRowHeading
                        isLink={playlists.playlists.total > countOfCardsInColumn}
                        heading={name}
                        hrefToFullCollection={`/genre/${id}`}
                    />

                    <ItemsCollectionRow
                        items={playlists.playlists.items.slice(0, countOfCardsInColumn)}
                    />
                </section>
            )}
        </>
    );
};

export default CategoryPlaylistsCollection;
