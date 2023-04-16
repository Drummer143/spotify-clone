import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";

import { useCloseInOuterClick } from "@/hooks";

type ModalProps = Pick<JSX.IntrinsicElements["div"], "children" | "className"> & {
    onClose: (e: MouseEvent) => void;

    targetRef?: React.RefObject<HTMLElement>;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    visible?: boolean;
    displayOnHide?: boolean;
};

const Modal: React.FC<ModalProps> = ({
    children,
    bottom,
    left,
    right,
    top,
    visible = false,
    className,
    displayOnHide = false,
    onClose,
    targetRef
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useCloseInOuterClick({
        onOuterClick: onClose,
        target: targetRef?.current ? targetRef.current : modalRef.current,
        active: visible || false
    });

    return createPortal(
        <div
            ref={modalRef}
            className={"absolute"
                .concat(className ? ` ${className}` : "")
                .concat(visible ? "" : displayOnHide ? " opacity-0 pointer-events-none" : " hidden")}
            style={{
                bottom,
                left: !left && !right ? "50%" : left,
                right,
                top: !top && !bottom ? "50%" : top
            }}
        >
            {children}
        </div>,
        document.getElementById("modal-root") as HTMLDivElement
    );
};

export default dynamic(() => Promise.resolve(Modal), { ssr: false });
