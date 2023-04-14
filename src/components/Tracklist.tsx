import React from "react";

import SongCard from "./SongCard";
import SonglistHead from "./SonglistHead";

type TracklistProps = {
    tracks: TrackInPlaylistInfo[];
};

const Tracklist: React.FC<TracklistProps> = ({ tracks }) => {
    return (
        <div className="relative z-[0] text-sm">
            <SonglistHead />

            <div className="px-[var(--content-spacing)]">
                {tracks &&
                    tracks.map(({ track, added_at: dateAdded }, i) => (
                        <SongCard
                            key={track.id}
                            number={i + 1}
                            albumId={track.album.id}
                            albumName={track.album.name}
                            artists={track.artists}
                            duration={track.duration_ms}
                            imageURL={track.album.images[2]?.url}
                            name={track.name}
                            songId={track.id}
                            dateAdded={dateAdded}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Tracklist;
