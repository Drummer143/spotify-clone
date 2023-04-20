import Head from "next/head";
import React, { useEffect, useRef } from "react";

import { GenreCard, Grid } from "@/components";
import { spotifyApi, changeHeadBGColor } from "@/redux";
import { useAppSelector, useAppDispatch } from "@/hooks";

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
    }, [dispatch]);

    return (
        <>
            <Head>
                <title>Spotify Clone - Search</title>
            </Head>

            <section ref={defaultSearchPageContainerRef} className="pt-28 px-content-spacing">
                <h2 className="text-2xl font-bold mb-4">Browse all</h2>

                <Grid>
                    {categories?.categories.items.map(category => (
                        <GenreCard key={category.id} category={category} />
                    ))}
                </Grid>
            </section>
        </>
    );
};

export default DefaultSearchPage;
