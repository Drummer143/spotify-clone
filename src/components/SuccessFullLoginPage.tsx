import React, { useEffect } from "react";

import { useAppDispatch } from "src/hooks/reduxHooks";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { setAccessToken } from "src/redux/slices/authSlice";

const SuccessFullLoginPage: React.FC = () => {
    const { search } = useLocation();
    const [searchParams] = useSearchParams(search);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const accessToken = searchParams.get("code");

        if(accessToken) {
            dispatch(setAccessToken(accessToken));
        }
    });

    return <Navigate to='/' replace />;
};

export default SuccessFullLoginPage;