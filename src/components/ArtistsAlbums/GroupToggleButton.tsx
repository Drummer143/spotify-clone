import React from "react";

type GroupToggleButtonProps = {
    children?: React.ReactNode
    id?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    checked?: boolean
};

const GroupToggleButton: React.FC<GroupToggleButtonProps> = ({ checked, children, id, onChange }) => {
    return (
        <label
            className={"cursor-pointer px-3 py-1 rounded-3xl text-sm transition-[background-color,_color]"
                .concat(" ", checked ?
                    "bg-white text-black" :
                    "bg-[hsla(0,0%,100%,.07)] text-white active:bg-[hsla(0,0%,100%,.04)] hover:bg-[hsla(0,0%,100%,.1)]")
            }
        >
            {children}
            <input
                checked={checked}
                onChange={onChange}
                type="radio"
                id={id}
                name="group-select"
                className="hidden"
            />
        </label>
    );
};

export default GroupToggleButton;