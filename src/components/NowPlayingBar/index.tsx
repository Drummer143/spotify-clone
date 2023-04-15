import React from "react";

import MiddleControls from "./MiddleControls";

import styles from "@/styles/NowPlayingBar.module.css";

const NowPlayingBar: React.FC = () => {
    return (
        <footer
            className={"w-full h-[5.625rem] bg-[#181818] px-4"
                .concat(" border border-solid border-[#282828]")
                .concat(" flex items-center")
                .concat(" ", styles.wrapper)}
        >
            <div className="min-w-[11.25rem] w-[30%]">song info</div>
            <MiddleControls />
            <div className="min-w-[11.25rem] w-[30%]">right buttons</div>
        </footer>
    );
};

export default NowPlayingBar;