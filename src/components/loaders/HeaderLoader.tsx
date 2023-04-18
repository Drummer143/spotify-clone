import React from "react";
import ContentLoader from "react-content-loader";

const HeaderLoader: React.FC = () => {

    return (
        <div
            className={"fixed top-0 right-0 z-[2] pr-content-spacing w-[calc(100%_-_var(--nav-bar-width))] h-16"
                .concat(" flex justify-end items-center")}
        >
            <div className="bg-[#282828] w-[125px] h-[2rem] rounded-[2rem]">
                <ContentLoader
                    speed={3}
                    gradientRatio={1}
                    width={125}
                    height={32}
                    viewBox="0 0 125 32"
                    backgroundColor="#404040"
                    foregroundColor="#707070"
                >
                    <circle cx="16" cy="16" r="14" />
                    <rect x={38} y={9} width={70} height={14} />
                </ContentLoader>
            </div>
        </div>
    );
};

export default HeaderLoader;