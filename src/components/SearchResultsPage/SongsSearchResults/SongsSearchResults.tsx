import React from "react";

import "moment-duration-format";

import SongCard from "./SongCard";

type SongsSearchResultProps = {
    result: NonNullable<SearchForItemResponse["tracks"]>;
};

const SongsSearchResult: React.FC<SongsSearchResultProps> = ({ result }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Songs</h2>

            <div>
                {result.items.slice(0, 5).map(song => (
                    <SongCard song={song} key={song.id} />
                ))}
            </div>
        </div>
    );
};

export default SongsSearchResult;
