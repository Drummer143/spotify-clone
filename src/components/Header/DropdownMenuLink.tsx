import Link, { LinkProps } from "next/link";
import React from "react";

import GoogleMaterialIcon from "../GoogleMaterialIcon";

type DropdownMenuLinkProps = LinkProps & Omit<React.HTMLProps<HTMLAnchorElement>, "ref"> & {
    internal?: boolean
    children?: React.ReactNode
};

const DropdownMenuLink: React.FC<DropdownMenuLinkProps> = ({ children, internal, ...linkProps }) => {
    return (
        <Link
            target={internal ? "_self" : "_blank"}
            className={"flex justify-between items-center rounded-sm h-10 p-3 text-sm hover:bg-[hsla(0,0%,100%,.1)]"}
            {...linkProps}
        >
            {children}
            {!internal && <GoogleMaterialIcon iconName="open_in_new" />}
        </Link>
    );
};

export default DropdownMenuLink;
