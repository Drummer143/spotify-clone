import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";

import GoogleMaterialIcon from "../GoogleMaterialIcon";

const SearchInput: React.FC = () => {
    const router = useRouter();

    const [input, setInput] = useState(router.query.query || "");
    const [debouncedInput] = useDebounce(input, 1000);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => setInput(e.target.value);

    const resetInput = () => setInput("");

    useEffect(() => {
        router.push({
            pathname: `/search/${debouncedInput}${router.query.type && debouncedInput ? `/${router.query.type}` : ""}`
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedInput]);

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
                className={"h-10 w-full rounded-full py-1.5 px-12 text-sm text-black".concat(
                    " placeholder:opacity-100 placeholder:text-[rgb(117,117,117)]"
                )}
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
