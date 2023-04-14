import Head from "next/head";
import React, { useEffect, useRef } from "react";

import { useAppSelector, useAppDispatch } from "@/hooks";
import { spotifyApi, changeHeadBGColor, setTitle } from "@/redux";
import GenreCard from "@/components/GenreCard";

const DefaultSearchPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const defaultSearchPageContainerRef = useRef<HTMLElement>(null);
    const dispatch = useAppDispatch();

    const [getCategories, { currentData: categories }] = spotifyApi.useLazyGetSeveralBrowseCategoriesQuery();

    useEffect(() => {
        if (accessToken) {
            getCategories({
                accessToken,
                searchParams: {
                    limit: 50,
                    locale: Intl.DateTimeFormat().resolvedOptions().locale
                }
            });
        }
    }, [accessToken, getCategories]);

    useEffect(() => {
        dispatch(changeHeadBGColor(["#12121200", "#121212"]));
        dispatch(setTitle("Spotify Clone - Search"));
    }, [dispatch]);

    return (
        <>
            <Head>
                <title>Spotify Clone - Search</title>
            </Head>

            <section ref={defaultSearchPageContainerRef} className="pt-28 px-[var(--content-spacing)]">
                <h2 className="text-2xl font-bold mb-4">Browse all</h2>

                <div
                    className={"grid grid-cols-[repeat(var(--cards-count),_minmax(0,_1fr))]".concat(
                        " gap-[var(--collection-gap)]"
                    )}
                >
                    {categories &&
                        categories.categories.items.map(category => (
                            <GenreCard key={category.id} category={category} />
                        ))}
                </div>
            </section>
        </>
    );
};

export default DefaultSearchPage;
