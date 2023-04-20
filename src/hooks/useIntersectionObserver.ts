import { useEffect, useMemo } from "react";

interface UseIntersectionObserverProps {
    targetRef: React.RefObject<HTMLElement>;
    onIntersection: IntersectionObserverCallback;

    options?: IntersectionObserverInit;
}

export const useIntersectionObserver = ({ onIntersection, targetRef }: UseIntersectionObserverProps) => {
    const observer = useMemo(() => new IntersectionObserver(onIntersection), [onIntersection]);

    useEffect(() => {
        const target = targetRef.current;

        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [observer, targetRef]);
};
