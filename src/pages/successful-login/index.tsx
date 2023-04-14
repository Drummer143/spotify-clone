import { useEffect } from "react";

import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { getAccessToken } from "@/redux";
import { useAppSelector, useAppDispatch } from "@/hooks";

export default function SuccessfulLogin() {
    const { accessToken } = useAppSelector(state => state.auth);

    const { isReady, ...router } = useRouter();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isReady) {
            return;
        }

        if (accessToken) {
            router.push({ pathname: "/" });
            return;
        }

        let code = router.query.code;

        if (code) {
            if (Array.isArray(code)) {
                code = code.join("");
            }

            dispatch(getAccessToken(code))
                .then(() => router.push({ pathname: "/" }));
        }
    }, [accessToken, dispatch, isReady]);

    return (
        <div className="w-screen h-screen flex items-center justify-center text-black text-3xl">Loading...</div>
    );
}