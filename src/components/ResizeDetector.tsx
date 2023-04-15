import dynamic from "next/dynamic";
import React, { useRef } from "react";

import { setCountOfCardsInColumn } from "@/redux";
import { useAppDispatch, useResizeObserver } from "@/hooks";

const ResizeDetector: React.FC = () => {
    const resizeDetectorRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    useResizeObserver({
        targetRef: resizeDetectorRef,
        onResize: e => {
            const lastEntry = e.at(-1);

            if (!lastEntry) {
                return;
            }

            const collectionTagWidth = lastEntry.contentRect.width;
            const countOfCards = Math.floor(collectionTagWidth / 200);

            document.body.style.setProperty("--collection-gap", `${Math.min(24, 6 * countOfCards)}px`);
            document.body.style.setProperty("--cards-count", countOfCards.toString());

            dispatch(setCountOfCardsInColumn(countOfCards));
        }
    });

    return (
        <div
            ref={resizeDetectorRef}
            className="absolute top-0 left-0 right-0 bottom-0 -z-50 invisible pointer-events-none"
        />
    );
};

export default dynamic(() => Promise.resolve(ResizeDetector), { ssr: false });
