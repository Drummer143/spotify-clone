import React from "react";

type SongTimeInfoProps = {
    children: React.ReactNode;
};

const SongTimeInfo: React.FC<SongTimeInfoProps> = ({ children }) => {
    return <p className="text-[0.6875rem] text-[#a7a7a7] min-w-[2.5rem]">{children}</p>;
};

export default SongTimeInfo;
