import React, { useEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { setAccessToken } from "src/redux/slices/authSlice";
import { getAccessToken } from "src/spotifyApiWrapper/auth/getAccessToken";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";

const SuccessFullLoginPage: React.FC = () => {
    const { codeVerifier, accessToken } = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const [searchParams] = useSearchParams(search);

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
        const userCode = searchParams.get("code");

        if (codeVerifier && userCode) {
            getAccessToken(userCode, codeVerifier)
                .then(res => {
                    dispatch(setAccessToken(res.access_token));

                    navigate("/");
                })
                .catch(error => console.error(error.response.data));
        }
    }, []);

    return (
        <div className="w-screen h-screen flex items-center justify-center text-black text-3xl">
            Loading...
        </div>
    );
};

export default SuccessFullLoginPage;