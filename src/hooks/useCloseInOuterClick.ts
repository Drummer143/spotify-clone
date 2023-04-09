import { useCallback, useEffect } from "react";

type UseCloseInOuterClickProps = {
    active: boolean;
    // eslint-disable-next-line no-unused-vars
    onOuterClick: (e: MouseEvent) => void;

    target?: HTMLElement | null;
};

export const useCloseInOuterClick = ({ onOuterClick, target, active }: UseCloseInOuterClickProps) => {
    const hide = useCallback(
        (e: MouseEvent) => {
            if (target && !e.composedPath().includes(target)) {
                onOuterClick(e);
                document.removeEventListener("click", hide);
            }
        },
        [target]
    );

    useEffect(() => {
        if (active) {
            document.addEventListener("click", hide);
        }

        return () => {
            document.removeEventListener("click", hide);
        };
    }, [active]);
};
