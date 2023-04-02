import React from "react";

type DropdownMenuProps = {
    visible?: boolean
    children?: React.ReactNode
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ visible, children }) => {
    return (
        <div
            className={"absolute -bottom-4 right-0 translate-y-full w-48 rounded shadow-header-menu"
                .concat(" bg-[#282828] p-1 flex flex-col")
                .concat(visible ? "" : " hidden")}
        >{children}</div>
    );
};

export default DropdownMenu;