import React, { useState } from "react";
import { MotionValue, useTransform, motion, useMotionValueEvent } from "framer-motion";

import { PlayButton } from "..";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { requestCurrentPagePlaylist, setPaused } from "@/redux";

type PlaylistBarProps = {
    scrollY: MotionValue<number>;
};

const PlaylistBar: React.FC<PlaylistBarProps> = ({ scrollY }) => {
    const { playlistInfo, currentPagePlaylistInfo, paused } = useAppSelector(state => state.player);

    const [opacityOffsetY] = useState([270, 350]);
    const [isClickable, setIsClickable] = useState(false);

    const opacity = useTransform(scrollY, opacityOffsetY, [0, 1]);

    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (typeof currentPagePlaylistInfo === "undefined") {
            return;
        }

        if (currentPagePlaylistInfo?.id === playlistInfo?.id) {
            dispatch(setPaused());
        } else {
            dispatch(requestCurrentPagePlaylist());
        }
    };

    useMotionValueEvent(opacity, "change", value => setIsClickable(value > 0.5));

    return (
        <motion.div className={isClickable ? "" : "pointer-events-none"} style={{ opacity }}>
            <PlayButton
                icon={paused || playlistInfo?.id !== currentPagePlaylistInfo?.id ? "play_arrow" : "pause"}
                size={3}
                onClick={handleClick}
            />
        </motion.div>
    );
};

export default PlaylistBar;
