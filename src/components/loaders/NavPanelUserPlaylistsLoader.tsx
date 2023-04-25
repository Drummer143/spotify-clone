import React from "react";
import ContentLoader from "react-content-loader";

const NavPanelUserPlaylistsLoader: React.FC = () => {
    return (
        <div className="flex-1 overflow-hidden px-4">
            <ContentLoader
                speed={3}
                gradientRatio={1}
                width={208}
                height={240}
                viewBox="0 0 208 240"
                backgroundColor="#404040"
                foregroundColor="#707070"
            >
                <rect x={0} y={18} width="95%" height={16} />
                <rect x={0} y={50} width="70%" height={16} />
                <rect x={0} y={82} width="82%" height={16} />
                <rect x={0} y={114} width="50%" height={16} />
                <rect x={0} y={146} width="63%" height={16} />
            </ContentLoader>
        </div>
    );
};

export default NavPanelUserPlaylistsLoader;
