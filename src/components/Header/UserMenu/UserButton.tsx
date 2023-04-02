import React from "react";

type UserButtonProps = JSX.IntrinsicElements["button"];

const UserButton: React.FC<UserButtonProps> = ({ className, ...buttonProps }) => {

    return (
        <button
            className={"w-[6.75rem] h-8 bg-[rgba(0,0,0,0.7)] rounded-full p-0.5 flex items-center justify-between"
                .concat(" transition-[background-color]")
                .concat(className ? ` ${className}` : "")
                .concat(" hover:bg-[#282828] focus:bg-[#282828]")}
            {...buttonProps}
        />
    );
};

export default UserButton;