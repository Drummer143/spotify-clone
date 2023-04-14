import { isRejected, PayloadAction } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { logOut } from '../slices/authSlice';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action: PayloadAction<{ status?: number }>) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejected(action) && action.payload?.status === 401) {
            console.warn('We got a rejected action!', action);

            api.dispatch(logOut());
            window.open(`${window.location.protocol}//${window.location.host}/login`, "_self");
        }

        return next(action)
    }