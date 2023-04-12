import { RefObject, useEffect } from "react";

type UseResizeObserverProps = {
    targetRef: RefObject<HTMLElement>;

    onResize: ResizeObserverCallback;
};

export const useResizeObserver = ({ onResize, targetRef }: UseResizeObserverProps) => {
    const resizeObserver = new ResizeObserver(onResize);

    useEffect(() => {
        if (targetRef.current) {
            resizeObserver.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                resizeObserver.unobserve(targetRef.current);
            }
        };
    }, [targetRef.current]);
};
