import React from "react";

import PlayButton from "../PlayButton";
import { useAppSelector } from "../../hooks";

const ActionBar: React.FC = () => {
    const headerBGColor = useAppSelector(state => state.app.headerBGColor);

    return (
        <div className="relative z-[0]">
            <div
                style={{ backgroundColor: headerBGColor[1] }}
                className={"absolute top-0 z-[-1] bg-action-bar-gradient h-[14.5rem] w-full"
                    .concat(" transition-[background-color] duration-500 pointer-events-none")}
            />

            <div className="px-[var(--content-spacing)] py-6 bg-transparent flex items-center gap-8">
                <PlayButton />
            </div>
        </div>
    );
};

export default ActionBar;
