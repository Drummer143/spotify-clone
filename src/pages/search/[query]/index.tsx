import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { SongsSearchResults, CategorySearchResults } from "@/components";

const AllSearchResultsPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const countOfCardsInColumn = useAppSelector(state => state.app.countOfCardsInColumn);

    const { query } = useRouter();

    const [categoriesOrder] = useState<Exclude<keyof SearchForItemResponse, "tracks">[]>([
        "artists",
        "albums",
        "playlists",
        "shows",
        "episodes"
    ]);

    const [getSearchResult, { currentData: result }] = spotifyApi.useLazySearchForItemQuery();

    useEffect(() => {
        if (!query.query || !accessToken) {
            return;
        }

        getSearchResult({
            accessToken,
            searchParams: {
                q: Array.isArray(query.query) ? query.query[0] : query.query,
                offset: 0,
                limit: 10,
                type: ["album", "artist", "episode", "playlist", "show", "track"]
            }
        });
    }, [accessToken, getSearchResult, query]);

    return (
        <>
            <Head>
                <title>Spotify Clone - Search</title>
            </Head>

            <div className="px-[var(--content-spacing)]">
                {result?.tracks && <SongsSearchResults result={result.tracks} />}

                {result &&
                    categoriesOrder.map(category => {
                        const res = result[category];

                        if (!res?.items.length) {
                            return undefined;
                        }

                        return (
                            <CategorySearchResults
                                key={category}
                                heading={category}
                                result={res}
                                countOfCards={countOfCardsInColumn}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default AllSearchResultsPage;
