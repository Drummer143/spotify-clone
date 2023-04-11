import React, { useRef, useState } from "react";

import GoogleMaterialIcon from "../../GoogleMaterialIcon";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

const ListHead: React.FC = () => {
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
            className={" mb-4 sticky top-16 transition-[background-color] px-[var(--content-spacing)]"
                .concat(" ", isSticky ? "bg-[#18181800]" : "bg-[#181818]")
                .concat(" max-lg:grid-cols-tracklist-4 max-md:grid-cols-tracklist-3")}
        >

            <div ref={headRef} className="w-[1px] absolute -top-[65px] invisible"></div>

            <div
                className={"px-4 grid grid-cols-tracklist-5 h-8 place-items-start items-center gap-4 text-[#b3b3b3]"
                    .concat(" border-0 border-b border-solid border-[hsla(0,0%,100%,.1)]")}
            >
                <span className="justify-self-end text-inherit">#</span>
                <span className="text-inherit">Title</span>
                <span className="text-inherit max-md:hidden">Album</span>
                <span className="text-inherit max-lg:hidden">Date added</span>
                <GoogleMaterialIcon iconName="schedule" className="justify-self-end mr-8 text-inherit" />
            </div>
        </div>
    );
};

export default ListHead;