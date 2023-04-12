import React, { useRef, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import SearchTypeButton from "./SearchTypeButton";
import { setCountOfCardsInColumn } from "../../redux/slices/appState";
import { useAppDispatch, useResizeObserver } from "../../hooks";

const SearchResultsPage: React.FC = () => {
    const [searchTypes] = useState([
        "tracks",
        "artists",
        "albums",
        "playlists",
        "shows",
        "episodes"
    ]);

    const { query = "" } = useParams<{ query: string; type: ItemType }>();
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

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

            dispatch(setCountOfCardsInColumn(countOfCards));
        }
    });

    return (
        <div ref={containerRef} className="pb-[var(--content-spacing)] pt-[calc(5rem_+_var(--content-spacing))]">
            <div
                className={"flex gap-2 fixed top-16 left-[var(--navbar-width)] z-[1] bg-[#121212]"
                    .concat(" px-[var(--content-spacing)] py-2 w-full")}
            >
                <SearchTypeButton to={`/search/${query}`} end>All</SearchTypeButton>

                {searchTypes.map(type => (
                    <SearchTypeButton key={type} to={`/search/${query}/${type}`}>{type}</SearchTypeButton>
                ))}
            </div>

            <Outlet />
        </div>
    );
};

export default SearchResultsPage;
