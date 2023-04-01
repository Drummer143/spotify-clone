import React, { useEffect } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";

const SuccessFullLoginPage: React.FC = () => {
    const { search } = useLocation();
    const [searchParams] = useSearchParams(search);

    useEffect(() => {
        const accessToken = searchParams.get("code");

        if(accessToken) {
            localStorage.setItem("access_token", accessToken);
        }
    });

    return <Navigate to='/' replace />;
};

export default SuccessFullLoginPage;