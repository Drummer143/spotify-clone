import React from 'react';
import { Outlet } from 'react-router-dom';

import NavPanel from './components/NavPanel/NavPanel';

const App: React.FC = () => {
    return (
        <div className='relative flex'>
            <NavPanel />

            <main className='flex flex-1 flex-col bg-gradient-to-br from-black to-[#121286]'>
                <div>Search panel</div>

                <div className='px-6 h-[calc(100vh_-_4.5rem)] overflow-y-auto scrollbar-hidden flex xl:flex-row flex-col-reverse'>
                    <div className='flex-1 h-fit pb-40'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;