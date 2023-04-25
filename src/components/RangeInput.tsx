import React, { useEffect, useRef, useState } from "react";

type RangeInputProps = {
    setToZero?: boolean;
    currentPercentage?: number;
    onMouseMove?: (percentage: number) => void;
    onMouseDown?: (percentage: number) => void;
};

const RangeInput: React.FC<RangeInputProps> = ({ onMouseMove, onMouseDown, setToZero, currentPercentage = 0 }) => {
    const [leftShift, setLeftShift] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [inputWidth, setInputWidth] = useState(0);

    const inputLeft = useRef(0);
    const inputWidthRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const width = inputWidthRef.current?.getBoundingClientRect().width || 0;

        setLeftShift(width * currentPercentage);
        setInputWidth(width);
    }, [setToZero, currentPercentage]);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
        const { left } = e.currentTarget.getBoundingClientRect();
        const { clientX } = e;

        inputLeft.current = left;

        setLeftShift(clientX - left);
        setIsMoving(true);

        if (onMouseDown) {
            onMouseDown((clientX - left) / inputWidth);
        }

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
        } else if (newShift > inputWidth) {
            newShift = inputWidth;
        }

        if (onMouseMove) {
            onMouseMove(newShift / inputWidth);
        }

        setLeftShift(newShift);
    };

    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        setIsMoving(false);
    };

    return (
        <div
            ref={inputWidthRef}
            className="group relative h-3 w-full flex items-center select-none"
            onMouseDown={handleClick}
        >
            <div className="h-1 w-full bg-[hsla(0,0%,100%,0.3)] rounded-sm overflow-hidden cursor-pointer">
                <div
                    style={{ transform: `translateX(calc(${setToZero ? 0 : leftShift}px - 100%))` }}
                    className={"w-full h-full transition-[background-color] rounded-sm".concat(
                        " ",
                        isMoving ? "bg-[#1db954]" : "bg-white group-hover:bg-[#1db954]"
                    )}
                ></div>
            </div>

            <div
                style={{ left: setToZero ? "0px" : leftShift + "px" }}
                className={"w-3 h-3 z-[2] absolute bg-white rounded-full -translate-x-1/2".concat(
                    isMoving ? "" : " hidden group-hover:block"
                )}
            ></div>
        </div>
    );
};

export default RangeInput;
