import Link, { LinkProps } from "next/link";
import React from "react";
import { useRouter } from "next/router";

import { GoogleMaterialIcon } from "@/components";

type NavPanelLinkProps = LinkProps &
    Omit<React.HTMLProps<HTMLAnchorElement>, "ref"> & {
        iconName: string;
    };

const NavPanelLink: React.FC<NavPanelLinkProps> = ({ iconName, href, children, className, ...linkProps }) => {
    const { asPath } = useRouter();

    return (
        <Link
            className={"group flex items-center gap-4 h-10 w-full px-4 text-sm font-bold duration-300"
                .concat(" transition-[color,_transform]")
                .concat(" active:scale-[0.98]")
                .concat(" ", href === asPath ? "text-white" : "text-[#d3d3d3] hover:text-white")
                .concat(className ? ` ${className}` : "")}
            href={href}
            {...linkProps}
        >
            <GoogleMaterialIcon
                iconName={iconName}
                size={1.8}
                FILL={href === asPath ? 1 : 0}
                className="text-inherit"
            />

            <span className=" leading-4 mt-0.5 text-inherit">{children}</span>
        </Link>
    );
};

export default NavPanelLink;
