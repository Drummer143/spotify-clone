import React from "react";

import { getAuthentificationLink } from "src/spotifyApiWrapper/getAuthentificationLink";

const LoginButton: React.FC = () => {
    const handleClick = () => window.open(getAuthentificationLink(), "_blank");

    return (
        <button
            onClick={handleClick}
            className={"h-12 w-[6.875rem] bg-white text-black rounded-full font-bold ml-6"
                .concat(" transition-[transform,_background-color]")
                .concat(" hover:scale-105")
                .concat(" active:scale-100 active:bg-[#b7b7b7]")}
        >
            Log in
        </button>
    );
};

export default LoginButton;