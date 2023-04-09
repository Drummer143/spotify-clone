import React from "react";
import { createPortal } from "react-dom";

import { useCloseInOuterClick } from "../../hooks";

type ModalProps = Pick<JSX.IntrinsicElements["div"], "children" | "className"> & {
    top?: number
    right?: number
    bottom?: number
    left?: number
    visible?: boolean
    unmountOnHide?: boolean
    targetRef: React.RefObject<HTMLElement>
    onClose: (e: MouseEvent) => void
};

const modalRoot = document.getElementById("modal-root") as HTMLDivElement;

const Modal: React.FC<ModalProps> = ({
    bottom,
    children,
    left,
    right,
    top,
    visible,
    className,
    unmountOnHide,
    onClose,
    targetRef
}) => {
    useCloseInOuterClick({
        onOuterClick: onClose,
        target: targetRef?.current,
        active: visible || false
    });

    if (unmountOnHide && !visible) {
        return <></>;
    }

    return createPortal(
        (
            <div
                className={"absolute"
                    .concat(className ? ` ${className}` : "")
                    .concat(visible ? "" : " opacity-0 pointer-events-none")}
                style={{
                    bottom,
                    left: !left && !right ? "50%" : left,
                    right,
                    top: !top && !bottom ? "50%" : top
                }}
            >
                {children}
            </div>
        ),
        modalRoot
    );
};

export default Modal;