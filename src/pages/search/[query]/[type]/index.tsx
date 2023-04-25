import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";
import { createDescription } from "@/utils";
import { Grid, ItemCard, ItemsCollectionRowLoader, SongCard, SonglistHead } from "@/components";

const CertainSearchResultsPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [searchType, setSearchType] = useState<SearchItemTypes>("playlists");

    const { query } = useRouter();

    const [getSearchResult, { currentData: result, isLoading }] = spotifyApi.useLazySearchForItemQuery();

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

    if (isLoading) {
        return (
            <div className="px-content-spacing pt-16">
                <ItemsCollectionRowLoader />
            </div>
        );
    }

    if (!result) {
        return <div>Error</div>;
    }

    if (searchType !== "tracks") {
        const items = result[searchType]?.items;

        return (
            <>
                <Head>
                    <title>Spotify Clone - Search</title>
                </Head>

                <Grid className="max-w-full w-full px-content-spacing]">
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
                </Grid>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Spotify Clone - Search</title>
            </Head>

            <section>
                <SonglistHead hiddenFields={{ dateAdded: true }} stickyX={108} />

                <div className="px-content-spacing">
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
            </section>
        </>
    );
};

export default CertainSearchResultsPage;
