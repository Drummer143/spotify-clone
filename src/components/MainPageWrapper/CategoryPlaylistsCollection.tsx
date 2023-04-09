import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PlaylistCard from "./PlaylistCard";
import { useAppSelector } from "../../hooks";
import { getCategorysPlaylists } from "../../spotifyApiWrapper";

type CategoryPlaylistsCollectionProps = {
    id: string;
    name: string;
    lengthToDisplay: number;
};

const CategoryPlaylistsCollection: React.FC<CategoryPlaylistsCollectionProps> = ({ id, name, lengthToDisplay }) => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [playlists, setPlaylists] = useState<PlaylistInfo[] | undefined>();

    const getPlaylists = async (accessToken: string) => {
        const {
            playlists: { items }
        } = await getCategorysPlaylists(id, accessToken, lengthToDisplay);

        setPlaylists(items);
    };

    useEffect(() => {
        if (accessToken) {
            getPlaylists(accessToken);
        }
    }, [lengthToDisplay]);

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
                className={"grid gap-[var(--collection-gap)] grid-rows-1"
                    .concat(" grid-cols-[repeat(var(--cards-count),_minmax(0,_1fr))]")}
            >
                {playlists &&
                    playlists
                        .slice(0, lengthToDisplay)
                        .map(playlist => (
                            <PlaylistCard
                                key={playlist.id}
                                id={playlist.id}
                                description={playlist.description}
                                imageUrl={playlist.images[0].url}
                                name={playlist.name}
                                playlistUrl={playlist.href}
                            />
                        ))}
            </div>
        </section>
    );
};

export default CategoryPlaylistsCollection;
