import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

type PlaylistLinkProps = Omit<NavLinkProps, "className" | "target" | "draggable">;

const PlaylistLink: React.FC<PlaylistLinkProps> = ({ children, ...rest }) => {
    return (
        <NavLink
            {...rest}
            draggable="false"
            className={({ isActive }) =>
                "h-8 w-full pl-[var(--left-sidebar-padding-left)]"
                    .concat(" text-sm truncate transition-[color] pr-[var(--left-sidebar-padding-right)]")
                    .concat(" whitespace-nowrap flex items-center")
                    .concat(" ", isActive ? "text-white" : "text-[#b3b3b3] hover:text-white")
            }
        >
            {statuses => (
                <p className="truncate text-inherit">
                    {typeof children === "function" ? children(statuses) : children}
                </p>
            )}
        </NavLink>
    );
};

export default PlaylistLink;
