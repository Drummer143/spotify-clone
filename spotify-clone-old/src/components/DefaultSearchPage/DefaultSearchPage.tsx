import React, { useEffect, useRef } from "react";

import GenreCard from "./GenreCard";
import { spotifyApi } from "../../redux/query/spotifyApi";
import { useAppDispatch, useAppSelector, useResizeObserver } from "../../hooks";
import { changeHeadBGColor, setTitle } from "../../redux/slices/appState";

const DefaultSearchPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const defaultSearchPageContainerRef = useRef<HTMLElement>(null);
    const dispatch = useAppDispatch();

    const [getCategories, { currentData: categories }] = spotifyApi.useLazyGetSeveralBrowseCategoriesQuery();

    useResizeObserver({
        targetRef: defaultSearchPageContainerRef,
        onResize: e => {
            const lastEntry = e.at(-1);

            if (!lastEntry) {
                return;
            }

            const collectionTagWidth = lastEntry.contentRect.width;
            let countOfCards = Math.floor(collectionTagWidth / 175);

            if (countOfCards < 2) {
                countOfCards = 2;
            }

            document.body.style.setProperty("--search-page-gap", `${Math.min(24, 6 * countOfCards)}px`);
            document.body.style.setProperty("--search-cards-count", countOfCards.toString());
        }
    });

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
    }, [accessToken]);

    useEffect(() => {
        dispatch(changeHeadBGColor(["#12121200", "#121212"]));
        dispatch(setTitle("Spotify Clone - Search"));
    }, []);

    return (
        <section ref={defaultSearchPageContainerRef} className="pt-28 px-[var(--content-spacing)]">
            <h2 className="text-2xl font-bold mb-4">Browse all</h2>

            <div
                className={"grid grid-cols-[repeat(var(--search-cards-count),_minmax(0,_1fr))]".concat(
                    " gap-[var(--search-page-gap)]"
                )}
            >
                {categories &&
                    categories.categories.items.map(category => <GenreCard key={category.id} category={category} />)}
            </div>
        </section>
    );
};

export default DefaultSearchPage;
