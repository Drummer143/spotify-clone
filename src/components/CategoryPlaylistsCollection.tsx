import React, { useEffect } from "react";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { Grid, ItemCard, ItemsCollectionHeading, ItemsCollectionRowLoader } from ".";

type CategoryPlaylistsCollectionProps = {
    id: string;
    name: string;
};

const CategoryPlaylistsCollection: React.FC<CategoryPlaylistsCollectionProps> = ({ id, name }) => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const countOfCardsInColumn = useAppSelector(state => state.app.countOfCardsInColumn);

    const [getPlaylists, { data: playlists, isLoading }] = spotifyApi.useLazyGetCategoryPlaylistsQuery();

    useEffect(() => {
        if (accessToken) {
            getPlaylists({ accessToken, categoryId: id });
        }
    }, [accessToken, getPlaylists, id]);

    if (isLoading) {
        return <ItemsCollectionRowLoader />;
    }

    if (!playlists?.playlists.items.length) {
        return <></>;
    }

    return (
        <section>
            <ItemsCollectionHeading
                isLink={playlists.playlists.total > countOfCardsInColumn}
                heading={name}
                hrefToFullCollection={`/genre/${id}`}
            />

            <Grid>
                {playlists.playlists.items.slice(0, countOfCardsInColumn).map(playlist => (
                    <ItemCard {...playlist} key={playlist.id} imageURL={playlist.images[0]?.url} />
                ))}
            </Grid>
        </section>
    );
};

export default CategoryPlaylistsCollection;
