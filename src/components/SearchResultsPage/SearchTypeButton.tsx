import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

type SearchTypeButtonProps = Omit<NavLinkProps, "className">

const SearchTypeButton: React.FC<SearchTypeButtonProps> = (props) => {
    return (
        <NavLink
            className={({ isActive }) => "text-sm px-3 py-1 rounded-[2rem] inline-block"
                .concat(" transition-[background-color] first-letter:uppercase")
                .concat(" ", isActive ?
                    "bg-white text-[#121212]" :
                    "bg-[hsla(0,0%,100%,.07)] hover:bg-[hsla(0,0%,100%,.1)] active:bg-[hsla(0,0%,100%,.04)]"
                )
            }
            {...props}
        >
        </NavLink>
    );
};

export default SearchTypeButton;