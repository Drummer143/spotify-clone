import React from "react";
import ContentLoader from "react-content-loader";

const ItemsCollectionRowHeadingLoader: React.FC = () => {
    return (
        <div className="w-full flex justify-between items-start">
            <ContentLoader
                width={257}
                height={23}
                speed={4.5}
                viewBox="0 0 257 23"
                backgroundColor="#404040"
                foregroundColor="#707070"
            >
                <rect x={0} y={0} width="100%" height="100%" />
            </ContentLoader>

            <ContentLoader
                width={72}
                height={11}
                speed={3}
                viewBox="0 0 72 11"
                backgroundColor="#404040"
                foregroundColor="#707070"
            >
                <rect x={0} y={0} width="100%" height="100%" />
            </ContentLoader>
        </div>
    );
};

export default ItemsCollectionRowHeadingLoader;
