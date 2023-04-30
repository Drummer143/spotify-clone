import React from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { GoogleMaterialIcon, PlayButton } from ".";
import { requestCurrentPagePlaylist, setPaused } from "@/redux";

type ActionBarProps = {
    itemInfo?: {
        buttonType: "heart" | "textButton";
        isFollowing: boolean;
        onFollowToggle: React.MouseEventHandler<HTMLSpanElement>;
    };
};

const ActionBar: React.FC<ActionBarProps> = ({ itemInfo }) => {
    const headerBGColor = useAppSelector(state => state.app.headerBGColor);
    const { playlistInfo, currentPagePlaylistInfo, paused } = useAppSelector(state => state.player);

    const dispatch = useAppDispatch();

    const handlePlayButtonClick = () => {
        if (typeof currentPagePlaylistInfo === "undefined") {
            return;
        }

        if (currentPagePlaylistInfo?.id === playlistInfo?.id) {
            dispatch(setPaused());
        } else {
            dispatch(requestCurrentPagePlaylist());
        }
    };

    return (
        <div className="relative z-[0]">
            <div
                style={{ backgroundColor: headerBGColor[1] }}
                className={"absolute top-0 z-[-1] bg-action-bar-gradient h-[14.5rem] w-full".concat(
                    " transition-[background-color] duration-500 pointer-events-none"
                )}
            />

            <div className="px-content-spacing py-6 bg-transparent flex items-center gap-8">
                <PlayButton
                    icon={paused || playlistInfo?.id !== currentPagePlaylistInfo?.id ? "play_arrow" : "pause"}
                    onClick={handlePlayButtonClick}
                />

                {itemInfo?.buttonType === "heart" && (
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

                {itemInfo?.buttonType === "textButton" && (
                    <button
                        className={"px-4 py-2 text-xs font-bold rounded border border-solid uppercase "
                            .concat(" tracking-[.1em]")
                            .concat(
                                " ",
                                itemInfo.isFollowing
                                    ? "border-white"
                                    : " border-[hsla(0,0%,100%,.3)] transition-[border-color] hover:border-white"
                            )}
                        onClick={itemInfo.onFollowToggle}
                    >
                        Follow{itemInfo.isFollowing ? "ing" : ""}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ActionBar;
