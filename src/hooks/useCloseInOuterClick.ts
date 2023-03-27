import { useCallback, useEffect } from "react";

type UseCloseInOuterClickProps = {
    active: boolean
    onOuterClick: (e: MouseEvent) => void

    target?: HTMLElement | null,
}

const useCloseInOuterClick = ({ onOuterClick, target, active }: UseCloseInOuterClickProps) => {
    const hideAuthMessage = useCallback((e: MouseEvent) => {
        if (target && !e.composedPath().includes(target)) {
            onOuterClick(e);
            document.removeEventListener('click', hideAuthMessage);
        }
    }, [target]);

    useEffect(() => {
        if (active) {
            document.addEventListener('click', hideAuthMessage);
        }

        return () => {
            document.removeEventListener('click', hideAuthMessage);
        }
    }, [active]);
}

export default useCloseInOuterClick;