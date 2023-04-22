import { useAppDispatch, useAppSelector } from "@/hooks";
import { setVolume, toggleMute } from "@/redux";
import React, { useEffect, useRef, useState } from "react";
import GoogleMaterialIcon from "../GoogleMaterialIcon";

const RightPart: React.FC = () => {
    const { volume, muted } = useAppSelector(state => state.player);

    const [leftShift, setLeftShift] = useState(0);
    const [isMoving, setIsMoving] = useState(false);

    const inputLeft = useRef(0);
    const inputWidth = useRef(0);

    const dispatch = useAppDispatch();

    const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const { clientX } = e;

        inputLeft.current = left;
        inputWidth.current = width;

        setLeftShift(clientX - left);
        setIsMoving(true);

        if (muted) {
            dispatch(toggleMute());
        }

        dispatch(setVolume((clientX - left) / inputWidth.current * 100));

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!e.buttons) {
            return;
        }

        const { clientX } = e;

        let newShift = clientX - inputLeft.current;

        if (newShift < 0) {
            newShift = 0;
        } else if (newShift > inputWidth.current) {
            newShift = inputWidth.current;
        }

        setLeftShift(newShift);

        dispatch(setVolume(newShift / inputWidth.current * 100));
    };

    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        setIsMoving(false);
    };

    const handleMuteButtonClick = () => {
        dispatch(toggleMute());
    };

    useEffect(() => {
        inputWidth.current = parseInt(getComputedStyle(document.body).getPropertyValue("--volume-input-width"));

        if (!muted) {
            setLeftShift(volume * inputWidth.current / 100);
        } else {
            setLeftShift(0);
        }
    }, [muted, volume]);

    return (
        <div className="w-[30%] flex items-center justify-end">
            <button
                onClick={handleMuteButtonClick}
                className={"w-8 h-8 flex justify-center items-center text-[hsla(0,0%,100%,0.7)]"
                    .concat(" hover:text-white active:text-[hsla(0,0%,100%,0.7)]")}
            >
                <GoogleMaterialIcon
                    iconName={(muted || !volume) ? "volume_mute" : (volume > 50 ? "volume_up" : "volume_down")}
                    className="text-inherit"
                    size={1.5}
                />
            </button>

            <div
                className="group relative h-3 w-[var(--volume-input-width)] flex items-center select-none"
                onMouseDown={handleClick}
            >
                <div className="h-1 w-full bg-[hsla(0,0%,100%,0.3)] rounded-sm overflow-hidden cursor-pointer">
                    <div
                        style={{ transform: `translateX(calc(${leftShift}px - 100%))` }}
                        className={"w-full h-full transition-[background-color] rounded-sm"
                            .concat(" ", isMoving ? "bg-[#1db954]" : "bg-white group-hover:bg-[#1db954]")}
                    ></div>
                </div>

                <div
                    style={{ left: leftShift + "px" }}
                    className={"w-3 h-3 z-[2] absolute bg-white rounded-full -translate-x-1/2"
                        .concat(isMoving ? "" : " hidden group-hover:block")}
                ></div>
            </div>
        </div>
    );
};

export default RightPart;