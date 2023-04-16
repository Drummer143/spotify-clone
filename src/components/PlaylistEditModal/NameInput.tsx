import React from "react";

import styles from "@/styles/EditPlaylistModal.module.css";

type NameInputProps = {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const NameInput: React.FC<NameInputProps> = ({ onChange, value }) => {
    return (
        <div className="relative">
            <input
                value={value}
                onChange={onChange}
                placeholder="Add a name"
                name="modal-playlist-name-input"
                className={"bg-[hsla(0,0%,100%,.1)] w-full h-full px-3 rounded border border-solid"
                    .concat(" border-transparent transition-[background-color,_border-color]")
                    .concat(" placeholder:text-[hsla(0,0%,100%,.3)] focus:bg-[#333] focus:border-[#535353] ")
                    .concat(" ", styles.input)}
            />

            <label
                htmlFor="modal-playlist-name-input"
                className={"absolute left-2.5 top-0 -translate-y-1/2 text-[0.675rem] transition-opacity".concat(
                    " duration-300 ",
                    styles.inputLabel
                )}
            >
                Name
            </label>
        </div>
    );
};

export default NameInput;
