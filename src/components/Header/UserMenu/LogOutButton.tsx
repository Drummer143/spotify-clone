import React from "react";

const LogOutButton: React.FC = () => {

    return (
        <button
            className={"relative rounded-sm h-10 p-3 text-sm flex-col"
                .concat(" hover:bg-[hsla(0,0%,100%,.1)]")
                .concat(" before:border-0 before:border-t before:border-solid before:w-full before:opacity-10")
                .concat(" before:absolute before:-top-[1px] before:left-0 before:border-[#fff]")}
        >Log out</button>
    );
};

export default LogOutButton;