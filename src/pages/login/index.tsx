import React from 'react';

import LoginButton from '@/components/LoginButton';

const LoginPage: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <p className="text-xl">Log in to Spotify listen music</p>
            <LoginButton />
        </div>
    )
}

export default LoginPage;