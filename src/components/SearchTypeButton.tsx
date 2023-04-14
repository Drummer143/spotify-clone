import Link, { LinkProps } from "next/link";
import React from "react";
import { useRouter } from "next/router";

type SearchTypeButtonProps = LinkProps & Omit<React.HTMLProps<HTMLAnchorElement>, "ref">;

const SearchTypeButton: React.FC<SearchTypeButtonProps> = ({ href, ...props }) => {
    const { asPath } = useRouter();

    return (
        <Link
            href={href}
            className={"text-sm px-3 py-1 rounded-[2rem] inline-block"
                .concat(" transition-[background-color] first-letter:uppercase")
                .concat(" ", asPath === href ?
                    "bg-white text-[#121212]" :
                    "bg-[hsla(0,0%,100%,.07)] hover:bg-[hsla(0,0%,100%,.1)] active:bg-[hsla(0,0%,100%,.04)]"
                )
            }
            {...props}
        >
        </Link>
    );
};

export default SearchTypeButton;