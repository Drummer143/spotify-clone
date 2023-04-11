import React, { useRef, useState } from "react";

import CategoryPlaylistsCollection from "./CategoryPlaylistsCollection";
import { spotifyApi } from "../../../redux/query/spotifyApi";
import { useAppSelector, useResizeObserver } from "../../../hooks";

const MainPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [countOfCardsToDisplay, setCountOfCardsToDisplay] = useState(2);

    const mainPageContainerRef = useRef<HTMLDivElement>(null);

    useResizeObserver({
        targetRef: mainPageContainerRef,
        onResize: e => {
            const lastEntry = e.at(-1);

            if (!lastEntry) {
                return;
            }

            const collectionTagWidth = lastEntry.contentRect.width;
            const countOfCards = Math.floor(collectionTagWidth / 200);

            document.body.style.setProperty("--collection-gap", `${Math.min(24, 6 * countOfCards)}px`);
            document.body.style.setProperty("--cards-count", countOfCards.toString());
            setCountOfCardsToDisplay(countOfCards);
        }
    });

    const { data: browseCategories } = spotifyApi.useGetSeveralBrowseCategoriesQuery({
        accessToken: accessToken || "",
        searchParams: {
            locale: Intl.DateTimeFormat().resolvedOptions().locale,
            limit: 3
        }
    }, {
        skip: !accessToken
    });

    return (
        <div
            ref={mainPageContainerRef}
            className={"pt-16 px-[var(--content-spacing)] flex flex-col gap-10 max-h-full"}
        >
            {browseCategories &&
                browseCategories.categories.items.map(category => (
                    <CategoryPlaylistsCollection
                        lengthToDisplay={countOfCardsToDisplay}
                        key={category.id}
                        {...category}
                    />
                ))}
        </div>
    );
};

export default MainPage;
