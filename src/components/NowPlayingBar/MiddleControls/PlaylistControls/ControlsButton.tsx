import React from "react";

type ControlsButtonProps = { active?: boolean } & JSX.IntrinsicElements["button"];

const ControlsButton: React.FC<ControlsButtonProps> = ({ className, active, ...rest }) => {
    return (
        <button
            {...rest}
            className={"w-8 h-8 group flex items-center justify-center transition-[color,_transform] relative"
                .concat(" ", active ?
                    "text-[#1db954] hover:text-[#1ed760] active:text-[#1db954]" :
                    "hover:text-white active:text-inherit"
                )
                .concat(active ? " after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2" : "")
                .concat(active ? " after:h-1 after:w-1 after:rounded-full after:bg-current" : "")
                .concat(className ? ` ${className}` : "")}
        />
    );
};

export default ControlsButton;