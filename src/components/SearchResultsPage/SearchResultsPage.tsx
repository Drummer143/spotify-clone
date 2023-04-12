import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import SongsSearchResult from "./SongsSearchResults/SongsSearchResults";
import { spotifyApi } from "../../redux/query/spotifyApi";
import { useAppSelector, useResizeObserver } from "../../hooks";
import CategorySearchResult from "./CategorySearchResult";

const SearchResultsPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [countOfCards, setCountOfCards] = useState(0);
    const [categoriesOrder] = useState<Exclude<keyof SearchForItemResponse, "tracks">[]>(["artists", "albums", "playlists", "shows", "episodes"]);

    const { query, type } = useParams<{ query: string, type: ItemType }>();
    const containerRef = useRef<HTMLDivElement>(null);

    const [getSearchResult, { currentData: result }] = spotifyApi.useLazySearchForItemQuery();

    useResizeObserver({
        targetRef: containerRef,
        onResize: e => {
            const lastEntry = e.at(-1);

            if (!lastEntry) {
                return;
            }

            const collectionTagWidth = lastEntry.contentRect.width;
            const countOfCards = Math.floor(collectionTagWidth / 200);

            document.body.style.setProperty("--collection-gap", `${Math.min(24, 6 * countOfCards)}px`);
            document.body.style.setProperty("--cards-count", countOfCards.toString());
            setCountOfCards(countOfCards);
        }
    });

    useEffect(() => {
        if (!query || !accessToken) {
            return;
        }

        getSearchResult({
            accessToken,
            searchParams: {
                q: query,
                offset: 0,
                limit: 10,
                type: type || ["album", "artist", "episode", "playlist", "show", "track"]
            }
        });
    }, [query]);

    return (
        <div ref={containerRef} className="p-[var(--content-spacing)] pt-16">
            {result?.tracks && <SongsSearchResult result={result.tracks} />}

            {result && categoriesOrder.map(category => {
                const res = result[category];

                return res && res.items.length && (
                    <CategorySearchResult
                        key={category}
                        heading={category}
                        result={res}
                        countOfCards={countOfCards}
                    />
                );
            })}
        </div>
    );
};

export default SearchResultsPage;