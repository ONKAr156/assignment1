import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../redux/apis/authApi";

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: defaultMiddleware => [
        ...defaultMiddleware(),
        authApi.middleware,
    ]
})

export default reduxStore