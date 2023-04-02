import React from "react";

import GoogleMaterialIcon from "../GoogleMaterialIcon";

const LanguageButton: React.FC = () => {
    return (
        <button
            className={"relative h-8 border border-solid leading-8 font-semibold"
                .concat(" text-white rounded-full pl-8 pr-4 mt-8 text-sm")
                .concat(" transition-[transform,_border-width,_border-color]")
                .concat(" hover:scale-105 hover:border-white hover:sborder-2")}
        >
            <GoogleMaterialIcon
                size={1.2}
                className="absolute top-1/2 -translate-y-1/2 left-3"
                iconName="language"
            />
            Placeholder
        </button>
    );
};

export default LanguageButton;
