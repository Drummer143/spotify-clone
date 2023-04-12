import React, { useRef } from "react";
import { useRouter } from "next/router";

import Modal from "@/components/Modal";
import AuthMessage from "./AuthMessage";
import { useAppSelector, useDisclosure } from "@/hooks";

type NavPanelButtonProps = JSX.IntrinsicElements["button"] & {
    modalHeading: string;
    modalMessage: string;
    to: string
};

const NavPanelButton: React.FC<NavPanelButtonProps> = ({
    className,
    children,
    modalHeading,
    modalMessage,
    to,
    ...buttonProps
}) => {
    const isAuthentificated = useAppSelector(state => !!state.auth.accessToken);

    const { isOpen, onClose, onOpen } = useDisclosure();

    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleClick = () => {
        if (isAuthentificated) {
            router.push({ pathname: to })
        } else {
            onOpen();
        }
    }

    return (
        <div ref={containerRef} className="relative">
            <button
                onClick={handleClick}
                className={"group flex items-center gap-4 h-10 w-full px-4 text-sm font-bold relative"
                    .concat(" text-[#d3d3d3] transition-[color] leading-4 hover:text-white duration-300")
                    .concat(` ${className}` || "")}
                {...buttonProps}
            >
                {children}
            </button>

            {isAuthentificated && (
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
            )}
        </div>
    );
};

export default NavPanelButton;
