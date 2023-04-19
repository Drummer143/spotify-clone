import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks";
import { spotifyApi } from "@/redux";
import SongCard from "./SongCard";

const PopularArtistTracks: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const { query } = useRouter();

    const [countOfDisplayingTracks, setCountOfDisplayingTracks] = useState(5);

    const [getTracks, { currentData: tracks }] = spotifyApi.useLazyGetArtistTopTrackQuery({
        selectFromResult: result => {
            const currentData = result.currentData?.tracks;

            return {
                ...result,
                currentData
            };
        }
    });

    const handleExpandButtonClick = () => setCountOfDisplayingTracks(prev => prev === 5 ? 10 : 5);

    useEffect(() => {
        let artistId = query.id;

        if (!accessToken || !artistId) {
            return;
        }

        setCountOfDisplayingTracks(5);

        if (Array.isArray(artistId)) {
            artistId = artistId[0];
        }

        getTracks({ accessToken, artistId, market: "AM" });
    }, [accessToken, getTracks, query.id]);

    if (!tracks) {
        return <></>;
    }

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Popular</h3>

            {tracks.slice(0, countOfDisplayingTracks).map((track, i) => (
                <SongCard
                    songId={track.id}
                    duration={track.duration_ms}
                    imageURL={track.album.images[0]?.url}
                    name={track.name}
                    number={i + 1}
                    key={track.id}
                />
            ))}

            <button
                className="p-4 text-sm text-[hsla(0,0%,100%,.7)] transition-[color] hover:text-white"
                onClick={handleExpandButtonClick}
            >
                {countOfDisplayingTracks === 5 ? "See more" : "Show less"}
            </button>
        </div>
    );
};

export default PopularArtistTracks;