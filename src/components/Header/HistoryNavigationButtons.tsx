import React from "react";

import { GoogleMaterialIcon } from "..";

const HistoryNavigationButtons: React.FC = () => {
    return (
        <div className="flex gap-4">
            <button className="rounded-full h-8 w-8 bg-black" aria-label="Go back">
                <GoogleMaterialIcon iconName="chevron_left" size={2} wght={200} />
            </button>

            <button className="rounded-full h-8 w-8 bg-black max-lg:hidden" aria-label="Go forward">
                <GoogleMaterialIcon iconName="chevron_left" size={2} className="rotate-180" wght={200} />
            </button>
        </div>
    );
};

export default HistoryNavigationButtons;
