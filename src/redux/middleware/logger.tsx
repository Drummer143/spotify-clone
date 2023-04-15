import { isRejected, PayloadAction } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { logOut } from "../slices/authSlice";

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => next => (action: PayloadAction<{ status?: number }>) => {
        if (isRejected(action) && action.payload?.status === 401) {
            api.dispatch(logOut());
            window.open(`${window.location.protocol}//${window.location.host}/login`, "_self");
        }

        return next(action);
    };
