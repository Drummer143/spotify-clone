import React from 'react';

import Layout from '@/components/Layout';
import LoginButton from '@/components/LoginButton';

const LoginPage: React.FC = () => {
    return (
        <Layout>
            <div className="w-full h-full flex flex-col justify-center items-center gap-10">
                <p className="text-xl">Log in to Spotify listen music</p>
                <LoginButton />
            </div>
        </Layout>
    )
}

export default LoginPage;