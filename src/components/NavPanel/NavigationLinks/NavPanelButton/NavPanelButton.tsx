import React, { useRef } from "react";

import Modal from "../../../Modal/Modal";
import AuthMessage from "./AuthMessage";
import { useDisclosure } from "../../../../hooks";

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
    const { isOpen, onClose, onOpen } = useDisclosure();

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="relative">
            <button
                onClick={onOpen}
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

            <Modal
                className={"transition-[transform,_opacity]"
                    .concat(" ", isOpen ? "translate-x-[-0.5rem]" : "opacity-0")}
                visible={isOpen}
                onClose={onClose}
                targetRef={containerRef}
                left={(containerRef.current?.getBoundingClientRect().right || 0) + 25}
                top={containerRef.current?.getBoundingClientRect().top}
            >
                <AuthMessage modalHeading={modalHeading} modalMessage={modalMessage} onClose={onClose} />
            </Modal>
        </div>
    );
};

export default NavPanelButton;
