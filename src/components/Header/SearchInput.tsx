import React, { useState } from "react";

import GoogleMaterialIcon from "../GoogleMaterialIcon";

const SearchInput: React.FC = () => {
    const [input, setInput] = useState("");

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => setInput(e.target.value);

    const resetInput = () => setInput("");

    return (
        <form className="flex-[0_1_364px] relative">
            <GoogleMaterialIcon
                iconName="search"
                className="absolute text-[#121212] left-2 top-1.5 pointer-events-none"
                size={1.8}
            />

            <input
                value={input}
                onChange={handleChange}
                className={"h-10 w-full rounded-full py-1.5 px-12 text-sm text-black"
                    .concat(" placeholder:opacity-100 placeholder:text-[rgb(117,117,117)]")}
                placeholder="What do you want to listen to?"
            />

            {input && (
                <GoogleMaterialIcon
                    iconName="close"
                    size={1.8}
                    className="absolute text-[#121212] right-2 top-1.5 cursor-pointer"
                    onClick={resetInput}
                />
            )}
        </form>
    );
};

export default SearchInput;