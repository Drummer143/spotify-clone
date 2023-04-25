import React from "react";

type SongTimeInfoProps = {
    side: "left" | "right";
    children: React.ReactNode;
};

const SongTimeInfo: React.FC<SongTimeInfoProps> = ({ children, side }) => {
    return (
        <p
            className={"text-[0.6875rem] text-[#a7a7a7] min-w-[2.5rem]"
                .concat(" ", side === "left" ? "text-right" : "text-left")}
        >{children}</p>
    );
};

export default SongTimeInfo;
