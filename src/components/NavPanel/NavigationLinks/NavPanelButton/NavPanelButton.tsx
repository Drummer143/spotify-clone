import React, { useRef, useState } from "react";

import AuthMessage from "./AuthMessage";
import useCloseInOuterClick from "src/hooks/useCloseInOuterClick";

type NavPanelButtonProps = JSX.IntrinsicElements["button"] & {
    leftItem: React.ReactNode;

    modalHeading: string;
    modalMessage: string;
};

const NavPanelButton: React.FC<NavPanelButtonProps> = ({
    className,
    children,
    leftItem,
    modalHeading,
    modalMessage,
    ...buttonProps
}) => {
    const [isAuthMessageVisible, setIsAuthMessageVisible] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleShowMessage = () => setIsAuthMessageVisible(true);

    const handleHideMessage = () => setIsAuthMessageVisible(false);

    useCloseInOuterClick({
        onOuterClick: handleHideMessage,
        target: containerRef.current,
        active: isAuthMessageVisible
    });

    return (
        <div ref={containerRef} className="relative">
            <button
                onClick={handleShowMessage}
                className={"group flex items-center gap-4 h-10 w-full px-4 text-sm font-bold relative".concat(
                    ` ${className}` || ""
                )}
                {...buttonProps}
            >
                {leftItem}
                <p className="text-[#d3d3d3] transition-[color] leading-4 group-hover:text-white duration-300">
                    {children}
                </p>
            </button>

            <AuthMessage
                modalHeading={modalHeading}
                modalMessage={modalMessage}
                onClose={handleHideMessage}
                visible={isAuthMessageVisible}
            />
        </div>
    );
};

export default NavPanelButton;
