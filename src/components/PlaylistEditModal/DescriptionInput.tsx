import React from "react";

import styles from "@/styles/EditPlaylistModal.module.css";

type DescriptionInputProps = {
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const DescriptionInput: React.FC<DescriptionInputProps> = ({ onChange, value }) => {
    return (
        <div className="relative">
            <textarea
                value={value}
                onChange={onChange}
                placeholder="Add an optional description"
                className={"resize-none bg-[hsla(0,0%,100%,.1)] w-full h-full rounded border border-solid p-2"
                    .concat(" pb-7 border-transparent transition-[background-color,_border-color]")
                    .concat(" placeholder:text-[hsla(0,0%,100%,.3)] focus:bg-[#333] focus:border-[#535353]")
                    .concat(" ", styles.input)}
            />

            <label
                htmlFor="modal-playlist-name-input"
                className={"absolute left-2.5 top-0 -translate-y-1/2 text-[0.675rem] transition-opacity".concat(
                    " duration-300 ",
                    styles.inputLabel
                )}
            >
                Description
            </label>
        </div>
    );
};

export default DescriptionInput;
