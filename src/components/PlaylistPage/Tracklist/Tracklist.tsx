import React from "react";

import Track from "./Track";
import ListHead from "./ListHead";

type TracklistProps = {
    tracks: TrackInPlaylistInfo[]
}

const Tracklist: React.FC<TracklistProps> = ({ tracks }) => {
    return (
        <div className="relative z-[0] text-sm">
            <ListHead />

            <div className="px-[var(--content-spacing)]">
                {tracks && tracks.map((track, i) => (
                    track.track && <Track track={track} number={i + 1} key={track.track.id} />
                ))}
            </div>
        </div>
    );
};

export default Tracklist;