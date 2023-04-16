import React from "react";

const SubmitButton: React.FC = () => {
    return (
        <button
            type="submit"
            className={"px-8 py-2 bg-white text-black rounded-full w-fit font-bold col-span-2 justify-self-end"
                .concat(" transition-[transform,_background-color]")
                .concat(" hover:scale-110 active:bg-[#b7b7b7] active:scale-100")}
        >
            Save
        </button>
    );
};

export default SubmitButton;
