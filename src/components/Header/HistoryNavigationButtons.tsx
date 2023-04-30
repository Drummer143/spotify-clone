import React, { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { GoogleMaterialIcon } from "..";
import { goBack, goForward } from "@/redux";
import { useAppDispatch, useAppSelector } from "@/hooks";

const HistoryNavigationButtons: React.FC = () => {
    const { canMoveBack, canMoveForward } = useAppSelector(state => state.history);

    const dispatch = useAppDispatch();

    const router = useRouter();

    const isMovedByNavigationButton = useRef(false);

    const handleHistoryChange = useCallback(() => {
        if (!isMovedByNavigationButton.current) {
            dispatch(goForward(true));
        } else {
            isMovedByNavigationButton.current = false;
        }
    }, [dispatch]);

    const handleGoBackButtonClick = () => {
        isMovedByNavigationButton.current = true;

        dispatch(goBack());

        history.back();
    };

    const handleGoForwardButtonClick = () => {
        isMovedByNavigationButton.current = true;

        dispatch(goForward(false));

        history.forward();
    };

    useEffect(() => {
        router.events.on("beforeHistoryChange", handleHistoryChange);

        return () => {
            router.events.off("beforeHistoryChange", handleHistoryChange);
        };
    }, [handleHistoryChange, router.events]);

    return (
        <div className="flex gap-4">
            <button
                className="rounded-full h-8 w-8 bg-black disabled:opacity-40"
                disabled={!canMoveBack}
                aria-label="Go back"
                onClick={handleGoBackButtonClick}
            >
                <GoogleMaterialIcon iconName="chevron_left" size={2} wght={200} />
            </button>

            <button
                className="rounded-full h-8 w-8 bg-black max-lg:hidden disabled:opacity-40"
                disabled={!canMoveForward}
                aria-label="Go forward"
                onClick={handleGoForwardButtonClick}
            >
                <GoogleMaterialIcon iconName="chevron_left" size={2} className="rotate-180" wght={200} />
            </button>
        </div>
    );
};

export default HistoryNavigationButtons;
