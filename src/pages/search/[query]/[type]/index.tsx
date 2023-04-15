import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { createDescription } from "@/utils";
import { ItemCard, SongCard, SonglistHead } from "@/components";

const CertainSearchResultsPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [searchType, setSearchType] = useState<SearchItemTypes>("playlists");

    const { query } = useRouter();

    const [getSearchResult, { currentData: result }] = spotifyApi.useLazySearchForItemQuery();

    useEffect(() => {
        setSearchType(query.type as SearchItemTypes);
    }, [query]);

    useEffect(() => {
        if (!query.query || !accessToken) {
            return;
        }

        getSearchResult({
            accessToken,
            searchParams: {
                q: Array.isArray(query.query) ? query.query[0] : query.query,
                offset: 0,
                type: searchType?.slice(0, -1) as ItemType
            }
        });
    }, [accessToken, getSearchResult, query.query, searchType]);

    if (!result || !query.type || Array.isArray(query.type)) {
        return <div>Loading...</div>;
    }

    if (searchType !== "tracks") {
        const items = result[searchType]?.items;

        return (
            <>
                <Head>
                    <title>Spotify Clone - Search</title>
                </Head>

                <div
                    className={"max-w-full w-full px-[var(--content-spacing)] grid gap-[var(--collection-gap)]".concat(
                        " grid-cols-[repeat(var(--cards-count),_minmax(0,_1fr))]"
                    )}
                >
                    {items?.length &&
                        items.map(item => (
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
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Spotify Clone - Search</title>
            </Head>

            <SonglistHead hiddenFields={{ dateAdded: true }} stickyX={108} />

            <div className="px-[var(--content-spacing)]">
                {result?.tracks?.items.length &&
                    result.tracks.items.map((track, i) => (
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
