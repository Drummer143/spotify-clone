import React, { useEffect, useRef, useState } from "react";

import CategoryPlaylistsCollection from "./CategoryPlaylistsCollection";
import { getSeveralBrowseCategories } from "../../spotifyApiWrapper";
import { useAppSelector, useResizeObserver } from "../../hooks";

const MainPage: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const [categories, setCategories] = useState<Category[] | undefined>();
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

    const getPlaylists = async (accessToken: string) => {
        const {
            categories: { items }
        } = await getSeveralBrowseCategories(
            accessToken,
            Intl.DateTimeFormat().resolvedOptions().locale.slice(-2),
            undefined,
            3
        );

        setCategories(items);
    };

    useEffect(() => {
        if (accessToken) {
            getPlaylists(accessToken);
        }
    }, []);

    return (
        <div
            ref={mainPageContainerRef}
            className={"min-w-[31.25rem] px-[var(--content-spacing)] flex flex-col gap-10 max-h-full".concat(
                " overflow-x-hidden overflow-y-auto"
            )}
        >
            {categories &&
                categories.map(category => (
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
