import React from "react";

import { useAppSelector } from "@/hooks";
import { GoogleMaterialIcon, PlayButton } from ".";

type ActionBarProps = {
    itemInfo?: {
        isFollowing: boolean;
        onFollowToggle: React.MouseEventHandler<HTMLSpanElement>;
    };
};

const ActionBar: React.FC<ActionBarProps> = ({ itemInfo }) => {
    const headerBGColor = useAppSelector(state => state.app.headerBGColor);

    return (
        <div className="relative z-[0]">
            <div
                style={{ backgroundColor: headerBGColor[1] }}
                className={"absolute top-0 z-[-1] bg-action-bar-gradient h-[14.5rem] w-full".concat(
                    " transition-[background-color] duration-500 pointer-events-none"
                )}
            />

            <div className="px-content-spacing py-6 bg-transparent flex items-center gap-8">
                <PlayButton />

                {itemInfo && (
                    <GoogleMaterialIcon
                        iconName="favorite"
                        size={2.4}
                        FILL={itemInfo.isFollowing ? 1 : 0}
                        onClick={itemInfo.onFollowToggle}
                        className={"cursor-pointer transition-[color]".concat(
                            " ",
                            itemInfo.isFollowing ? "text-[#1ed760]" : "text-[hsla(0,0%,100%,.7)] hover:text-white"
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default ActionBar;
