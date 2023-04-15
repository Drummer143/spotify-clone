import React from "react";

import { GoogleMaterialIcon } from "@/components";

type MobileMenuButtonProps = JSX.IntrinsicElements["button"] & {
    isMenuOpened: boolean;
};

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isMenuOpened, className, ...buttonProps }) => {
    return (
        <button
            className={"w-5 h-8 rounded-3xl transition-[background_color] hover:bg-[#282828] focus:bg-[#282828]".concat(
                className ? ` ${className}` : ""
            )}
            {...buttonProps}
        >
            <GoogleMaterialIcon iconName={isMenuOpened ? "close" : "menu"} size={1.2} />
        </button>
    );
};

export default MobileMenuButton;
