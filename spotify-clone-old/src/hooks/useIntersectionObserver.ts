import { useEffect } from "react";

interface UseIntersectionObserverProps {
    targetRef: React.RefObject<HTMLElement>;
    onIntersection: IntersectionObserverCallback;

    options?: IntersectionObserverInit;
}

export const useIntersectionObserver = ({ onIntersection, targetRef }: UseIntersectionObserverProps) => {
    const observer = new IntersectionObserver(onIntersection);

    useEffect(() => {
        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [targetRef.current]);
};
