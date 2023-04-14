import { RefObject, useEffect, useMemo } from "react";

type UseResizeObserverProps = {
    targetRef: RefObject<HTMLElement>;

    onResize: ResizeObserverCallback;
};

export const useResizeObserver = ({ onResize, targetRef }: UseResizeObserverProps) => {
    const resizeObserver = useMemo(() => new ResizeObserver(onResize), [onResize]);

    useEffect(() => {
        const target = targetRef.current;

        if (target) {
            resizeObserver.observe(target);
        }

        return () => {
            if (target) {
                resizeObserver.unobserve(target);
            }
        };
    }, [resizeObserver, targetRef]);
};
