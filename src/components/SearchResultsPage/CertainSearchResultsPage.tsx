import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import SongCard from "../SongCard";
import ItemCard from "../ItemCard";
import SonglistHead from "../SonglistHead";
import { spotifyApi } from "../../redux/query/spotifyApi";
import { useAppSelector } from "../../hooks";
import { createDescription } from "../../utils";

const CertainSearchResultsPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const { query, type = "tracks" } = useParams<{ query: string, type: SearchItemTypes }>();

    const [getSearchResult, { currentData: result }] = spotifyApi.useLazySearchForItemQuery();

    useEffect(() => {
        if (!query || !accessToken) {
            return;
        }

        getSearchResult({
            accessToken,
            searchParams: {
                q: query,
                offset: 0,
                type: type.slice(0, -1) as ItemType
            }
        });
    }, [query, accessToken, type]);

    if (!result) {
        return (
            <div>Loading...</div>
        );
    }

    if (type !== "tracks") {
        const items = result[type]?.items;

        return (
            <div
                className={"max-w-full w-full px-[var(--content-spacing)] grid gap-[var(--collection-gap)]"
                    .concat(" grid-cols-[repeat(var(--cards-count),_minmax(0,_1fr))]")}
            >
                {items?.length && items.map(item => (
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        description={createDescription(item)}
                        imageURL={item.images[0]?.url}
                    />
                ))}
            </div>
        );
    }

    return (
        <>
            <SonglistHead hiddenFields={{ dateAdded: true }} stickyX={108} />

            <div className="px-[var(--content-spacing)]">
                {result?.tracks?.items.length && result.tracks.items.map((track, i) => (
                    <SongCard
                        key={track.id}
                        albumId={track.album.id}
                        albumName={track.album.name}
                        artists={track.artists}
                        duration={track.duration_ms}
                        imageURL={track.album.images[2]?.url}
                        name={track.name}
                        number={i + 1}
                        songId={track.id}
                    />
                ))}
            </div>
        </>
    );
};

export default CertainSearchResultsPage;