import React from "react";
import { LinkProps, NavLink } from "react-router-dom";

import GoogleMaterialIcon from "../../GoogleMaterialIcon";

type NavPanelLinkProps = LinkProps & {
    iconName: string;
};

const NavPanelLink: React.FC<NavPanelLinkProps> = ({
    iconName,
    children,
    className,
    ...linkProps
}) => (
    <NavLink
        className={"group flex items-center gap-4 h-10 w-full px-4 text-sm font-bold duration-300"
            .concat(" active:scale-[0.98]")
            .concat(className ? ` ${className}` : "")}
        {...linkProps}
    >
        {({ isActive }) => (
            <>
                <GoogleMaterialIcon
                    iconName={iconName}
                    className="flex justify-center items-center"
                    size={1.8}
                    FILL={isActive ? 1 : 0}
                />
                <p
                    className={"transition-[color] leading-4 mt-0.5"
                        .concat(" group-hover:text-white")
                        .concat(" ", isActive ? "text-white" : "text-[#d3d3d3]")}
                >
                    {children}
                </p>
            </>
        )}
    </NavLink>
);

export default NavPanelLink;
