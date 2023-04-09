import React from "react";

type DropdownMenuProps = {
    children?: React.ReactNode
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
    return (
        <div
            className={"w-48 rounded shadow-header-menu"
                .concat(" bg-[#282828] p-1 flex flex-col")}
        >{children}</div>
    );
};

export default DropdownMenu;