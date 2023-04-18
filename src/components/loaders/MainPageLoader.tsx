import React from "react";
import ItemsCollectionRowLoader from "./ItemsCollectionRowLoader";

const MainPageLoader: React.FC = () => {

    return (
        <div className='pt-16 px-[var(--content-spacing)] flex flex-col gap-10 max-h-full overflow-hidden'>
            <ItemsCollectionRowLoader />
            <ItemsCollectionRowLoader />
            <ItemsCollectionRowLoader />
        </div>
    );
};

export default MainPageLoader;