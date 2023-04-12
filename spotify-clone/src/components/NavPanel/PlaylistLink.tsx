import Link, { LinkProps } from "next/link";
import React from "react";
import { useRouter } from "next/router";

type PlaylistLinkProps = Omit<LinkProps & Omit<React.HTMLProps<HTMLAnchorElement>, "ref">, "className" | "target" | "draggable">;

const PlaylistLink: React.FC<PlaylistLinkProps> = ({ children, href, ...rest }) => {
    const { asPath } = useRouter();

    return (
        <Link
            {...rest}
            draggable="false"
            href={href}
            className={"h-8 w-full pl-[var(--left-sidebar-padding-left)]"
                .concat(" text-sm truncate transition-[color] pr-[var(--left-sidebar-padding-right)]")
                .concat(" whitespace-nowrap flex items-center truncate text-inherit")
                .concat(" ", href === asPath ? "text-white" : "text-[#b3b3b3] hover:text-white")
            }
        >
            {children}
        </Link>
    );
};

export default PlaylistLink;
