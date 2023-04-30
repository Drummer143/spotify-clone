import Link from "next/link";
import React, { useEffect } from "react";

import Loader from "../Loader";
import ImageWrapper from "../ImageWrapper";
import ListingOfAuthors from "../ListingOfAuthors";
import { spotifyApi } from "@/redux";
import { useAppSelector } from "@/hooks";

const LeftPart: React.FC = () => {
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const { playlist, currentSongIndex } = useAppSelector(state => state.player);

    const [getCurrentTrack, { currentData: currentTrack, isLoading }] = spotifyApi.useLazyGetTrackQuery();

    useEffect(() => {
        if (accessToken && playlist[currentSongIndex]?.id) {
            getCurrentTrack({ accessToken, trackId: playlist[currentSongIndex].id });
        }
    }, [accessToken, currentSongIndex, getCurrentTrack, playlist]);

    if (isLoading) {
        return <Loader />;
    }

    if (!playlist.length || !currentTrack) {
        return <div className="w-[30%]"></div>;
    }

    return (
        <div className="w-[30%] flex items-center gap-2">
            <ImageWrapper
                type="track"
                height={56}
                width={56}
                imageURL={currentTrack.album.images[0]?.url}
                proxy
                imageClassName="rounded"
            />

            <div>
                <Link className="text-[0.875rem] line-clamp-1 hover:underline" href={`/track/${currentTrack.id}`}>
                    {currentTrack.name}
                </Link>

                <div className="text-[0.75rem] line-clamp-1 tracking-widest">
                    <ListingOfAuthors artists={currentTrack.artists} />
                </div>
            </div>
        </div>
    );
};

export default LeftPart;
