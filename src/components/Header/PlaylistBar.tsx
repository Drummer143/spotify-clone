import React, { useState } from "react";
import { MotionValue, useTransform, motion, useMotionValueEvent } from "framer-motion";

import PlayButton from "../PlayButton";

type PlaylistBarProps = {
    scrollY: MotionValue<number>;
};

const PlaylistBar: React.FC<PlaylistBarProps> = ({ scrollY }) => {
    const [opacityOffsetY] = useState([270, 350]);
    const [isClickable, setIsClickable] = useState(false);

    const opacity = useTransform(scrollY, opacityOffsetY, [0, 1]);

    useMotionValueEvent(opacity, "change", value => setIsClickable(value > 0.5));

    return (
        <motion.div className={isClickable ? "" : "pointer-events-none"} style={{ opacity, pointerEvents: opacity }}>
            <PlayButton size={3} />
        </motion.div>
    );
};

export default PlaylistBar;
