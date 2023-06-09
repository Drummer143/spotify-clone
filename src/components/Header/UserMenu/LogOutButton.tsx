import React from "react";
import { useRouter } from "next/router";

import { logOut } from "@/redux";
import { useAppDispatch } from "@/hooks";

const LogOutButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClick = () => {
        dispatch(logOut());

        router.push({ pathname: "/login" });
    };

    return (
        <button
            onClick={handleClick}
            className={"relative rounded-sm h-10 p-3 text-sm flex-col"
                .concat(" hover:bg-[hsla(0,0%,100%,.1)]")
                .concat(" before:border-0 before:border-t before:border-solid before:w-full before:opacity-10")
                .concat(" before:absolute before:-top-[1px] before:left-0 before:border-[#fff]")}
        >
            Log out
        </button>
    );
};

export default LogOutButton;
