import React from "react";

import "moment-duration-format";

import { SongCard } from ".";

type SongsSearchResultProps = {
    result: NonNullable<SearchForItemResponse["tracks"]>;
};

const SongsSearchResult: React.FC<SongsSearchResultProps> = ({ result }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Songs</h2>

            <div>
                {result.items.slice(0, 5).map((song, i) => (
                    <SongCard
                        number={i}
                        hideNumber
                        key={song.id}
                        artists={song.artists}
                        duration={song.duration_ms}
                        imageURL={song.album.images[2]?.url}
                        name={song.name}
                        songId={song.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default SongsSearchResult;
