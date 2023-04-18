import React from "react";
import ContentLoader from "react-content-loader";

const ItemCardLoader: React.FC = () => {
    return (
        <div className="w-[10.25rem] h-[14.5rem] bg-[#282828] rounded-lg">
            <ContentLoader
                speed={3}
                gradientRatio={1}
                width={164}
                height={232}
                viewBox="0 0 164 232"
                backgroundColor="#404040"
                foregroundColor="#707070"
            >
                <rect x={16} y={16} width={132} height={132} />
                <rect x={16} y={164} width={122} height={11} />
                <rect x={16} y={182} width={72} height={11} />
                <rect x={16} y={206} width={94} height={6} />
            </ContentLoader>
        </div>
    );
};

export default ItemCardLoader;