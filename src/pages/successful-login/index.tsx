import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { getAccessToken } from "@/redux";
import { useAppSelector, useAppDispatch } from "@/hooks";

export default function SuccessfulLogin() {
    const { accessToken } = useAppSelector(state => state.auth);

    const { isReady, push, query } = useRouter();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isReady) {
            return;
        }

        if (accessToken) {
            push({ pathname: "/" });
            return;
        }

        let code = query.code;

        if (code) {
            if (Array.isArray(code)) {
                code = code.join("");
            }

            dispatch(getAccessToken(code)).then(() => push({ pathname: "/" }));
        }
    }, [accessToken, dispatch, isReady, push, query.code]);

    return <div className="w-screen h-screen flex items-center justify-center text-black text-3xl">Loading...</div>;
}
