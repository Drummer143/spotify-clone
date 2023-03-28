import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header";
import NavPanel from "./components/NavPanel/NavPanel";

const App: React.FC = () => {
    return (
        <div className="relative flex">
            <NavPanel />

            <Header />

            <main className="flex flex-1 flex-col bg-slate-600">
                <div
                    className={"px-6 h-[calc(100vh_-_4.5rem)] overflow-y-auto scrollbar-hidden flex flex-col-reverse"
                        .concat(" xl:flex-row")}
                >
                    <div className="flex-1 h-fit pb-40">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
