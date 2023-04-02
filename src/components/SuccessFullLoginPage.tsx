import React, { useEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { getAccessToken } from "src/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";

const SuccessFullLoginPage: React.FC = () => {
    const { accessToken } = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const [searchParams] = useSearchParams(search);

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
        const userCode = searchParams.get("code");

        if (userCode) {
            dispatch(getAccessToken(userCode));
        }
    }, []);

    return (
        <div className="w-screen h-screen flex items-center justify-center text-black text-3xl">
            Loading...
        </div>
    );
};

export default SuccessFullLoginPage;