import React from "react";

import { useAppDispatch } from "../hooks";
import { setCodeVerifier } from "../redux";
import { getAuthentificationLink } from "../spotifyApiWrapper";
import { generateRandomString, generateCodeChallenge } from "../utils";

const LoginButton: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        const codeVerifier = generateRandomString(128);

        dispatch(setCodeVerifier(codeVerifier));

        const codeChallenge = await generateCodeChallenge(codeVerifier);

        window.open(getAuthentificationLink(codeChallenge), "_self");
    };

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
