import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

import SearchTypeButton from "./SearchTypeButton";

type SearchResultsPageLayoutProps = {
    children?: React.ReactNode
}

const SearchResultsPageLayout: React.FC<SearchResultsPageLayoutProps> = ({ children }) => {
    const [searchTypes] = useState([
        "tracks",
        "artists",
        "albums",
        "playlists",
        "shows",
        "episodes"
    ]);

    const { query } = useRouter()
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="pb-[var(--content-spacing)] pt-[calc(5rem_+_var(--content-spacing))]">
            <div
                className={"flex gap-2 fixed top-16 left-[var(--navbar-width)] z-[1] bg-[#121212]"
                    .concat(" px-[var(--content-spacing)] py-2 w-full")}
            >
                <SearchTypeButton href={`/search/${query.query}`}>All</SearchTypeButton>

                {searchTypes.map(type => (
                    <SearchTypeButton key={type} href={`/search/${query.query}/${type}`}>{type}</SearchTypeButton>
                ))}
            </div>

            {children}
        </div>
    );
};

export default SearchResultsPageLayout;
