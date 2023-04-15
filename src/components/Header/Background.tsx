import React, { useState } from "react";
import { MotionValue, motion, useTransform } from "framer-motion";

import { useAppSelector } from "@/hooks";
import { getDarkenColor } from "@/utils";
import dynamic from "next/dynamic";

type BackgroundProps = {
    scrollY: MotionValue<number>;
};

const Background: React.FC<BackgroundProps> = ({ scrollY }) => {
    const headerBGColor = useAppSelector(state => state.app.headerBGColor);

    const [BGTransitionOffsetY] = useState([10, 150]);

    const bgColor = useTransform(scrollY, BGTransitionOffsetY, [headerBGColor[0], getDarkenColor(headerBGColor[1])]);

    return (
        <motion.div
            className="absolute top-0 left-0 bottom-0 right-0 z-[-1]"
            style={{
                backgroundColor: bgColor
            }}
        ></motion.div>
    );
};

export default dynamic(() => Promise.resolve(Background), { ssr: false });
