import React, { useEffect, useState } from "react";

import SongsSearchResult from "./SongsSearchResults";
import CategorySearchResult from "./CategorySearchResult";
import { spotifyApi } from "../../../redux/query/spotifyApi";
import { useAppSelector } from "../../../hooks";
import { useParams } from "react-router-dom";

const AllSearchResultsPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const countOfCardsInColumn = useAppSelector(state => state.app.countOfCardsInColumn);

    const { query } = useParams<{ query: string, type: string }>();

    const [categoriesOrder] = useState<Exclude<keyof SearchForItemResponse, "tracks">[]>([
        "artists",
        "albums",
        "playlists",
        "shows",
        "episodes"
    ]);

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
                limit: 10,
                type: ["album", "artist", "episode", "playlist", "show", "track"]
            }
        });
    }, [query, accessToken]);

    return (
        <div className="px-[var(--content-spacing)]">
            {result?.tracks && <SongsSearchResult result={result.tracks} />}

            {result &&
                categoriesOrder.map(category => {
                    const res = result[category];

                    if (!res?.items.length) {
                        return undefined;
                    }

                    return (
                        <CategorySearchResult
                            key={category}
                            heading={category}
                            result={res}
                            countOfCards={countOfCardsInColumn}
                        />
                    );
                })}
        </div>
    );
};

export default AllSearchResultsPage;