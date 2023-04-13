import React, { useRef, useState } from "react";

import GoogleMaterialIcon from "./GoogleMaterialIcon";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

type SonglistHeadProps = {
    stickyX?: number

    hiddenFields?: {
        number?: boolean
        album?: boolean
        dateAdded?: boolean
    }
}

const SonglistHead: React.FC<SonglistHeadProps> = ({ stickyX = 64, hiddenFields = {} }) => {
    const [countOfHiddenFields] = useState(Object.values(hiddenFields).filter(f => f).length);
    const [isSticky, setIsSticky] = useState(false);

    const headRef = useRef<HTMLDivElement>(null);

    useIntersectionObserver({
        onIntersection: ([e]) => setIsSticky(e.isIntersecting),
        targetRef: headRef,
        options: {
            threshold: [1]
        }
    });

    return (
        <div
            className={" mb-4 sticky transition-[background-color] px-[var(--content-spacing)]"
                .concat(" ", isSticky ? "bg-[#18181800]" : "bg-[#181818]")}
            style={{
                top: `${stickyX}px`
            }}
        >
            <div
                ref={headRef}
                className="w-[1px] absolute invisible"
                style={{ top: `${-1 * stickyX - 1}px` }}
            />
            <div
                className={"px-4 grid h-8 place-items-start items-center gap-4 text-[#b3b3b3]"
                    .concat(" border-0 border-b border-solid border-[hsla(0,0%,100%,.1)]")
                    .concat(countOfHiddenFields === 0 ?
                        " grid-cols-tracklist-5 max-lg:grid-cols-tracklist-4 max-md:grid-cols-tracklist-3" :
                        ""
                    )
                    .concat(countOfHiddenFields === 1 ? " grid-cols-tracklist-4 max-md:grid-cols-tracklist-3" : "")
                    .concat(countOfHiddenFields > 1 ? " grid-cols-tracklist-3" : "")
                    .concat(" ")}
            >
            {!hiddenFields.number && <span className="justify-self-end text-inherit">#</span>}
            <span className="text-inherit">Title</span>
            {!hiddenFields.album && <span className="text-inherit max-md:hidden">Album</span>}
            {!hiddenFields.dateAdded && <span className="text-inherit max-lg:hidden">Date added</span>}
            <GoogleMaterialIcon iconName="schedule" className="justify-self-end mr-8 text-inherit" />
        </div>
        </div >
    );
};

export default SonglistHead;
