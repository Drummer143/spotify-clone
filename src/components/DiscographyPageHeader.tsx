import Link from "next/link";
import React, { useRef, useState } from "react";

import { GoogleMaterialIcon } from ".";
import { useIntersectionObserver } from "@/hooks";

type DiscographyPageHeaderProps = {
    artistName: string
    artistId: string
    appearance: "grid" | "list"
    setAppearance: React.Dispatch<React.SetStateAction<"grid" | "list">>
};

const DiscographyPageHeader: React.FC<DiscographyPageHeaderProps> = ({
    artistName,
    appearance,
    setAppearance,
    artistId
}) => {
    const [isSticky, setIsSticky] = useState(false);

    const localHeaderRef = useRef<HTMLDivElement>(null);

    useIntersectionObserver({
        onIntersection: ([e]) => setIsSticky(!e.isIntersecting),
        targetRef: localHeaderRef,
        options: {
            threshold: [1]
        }
    });

    return (
        <div
            className={"sticky top-16 z-[1] mb-6 h-10 flex justify-between items-center px-content-spacing"
                .concat(" border-0 border-b border-solid transition-[background-color,_border-color]")
                .concat(isSticky ? " bg-[#181818] border-[hsla(0,0%,100%,.1)]" : " border-transparent")}
        >
            <div ref={localHeaderRef} className="absolute z-[100] -top-[65px]"></div>

            <Link href={`/artist/${artistId}`} className="text-2xl font-bold hover:underline">
                {artistName}
            </Link>

            <div className="flex gap-3">
                <div>

                </div>
                <button
                    className={"p-1.5 rounded-full"
                        .concat(" ", appearance === "list" ?
                            "text-white bg-[hsla(0,0%,100%,.1)]" :
                            "text-[hsla(0,0%,100%,.7)] hover:text-white hover:bg-[hsla(0,0%,100%,.1)]")
                    }
                    onClick={() => setAppearance("list")}
                >
                    <GoogleMaterialIcon iconName="view_list" size={1.3} className="text-inherit" />
                </button>

                <button
                    className={"p-1.5 rounded-full"
                        .concat(" ", appearance === "grid" ?
                            "text-white bg-[hsla(0,0%,100%,.1)]" :
                            "text-[hsla(0,0%,100%,.7)] hover:text-white hover:bg-[hsla(0,0%,100%,.1)]")
                    }
                    onClick={() => setAppearance("grid")}
                >
                    <GoogleMaterialIcon iconName="grid_view" size={1.3} className="text-inherit" />
                </button>
            </div>
        </div>
    );
};

export default DiscographyPageHeader;