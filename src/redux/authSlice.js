import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../redux/apis/authApi";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const authApi = createSlice({
    name: "publicSlice",
    initialState: {
        auth: JSON.parse(localStorage.getItem("auth"))
    },
    reducers: {
        logout: (state) => {
            state.auth = null
            localStorage.removeItem("auth")
            signOut(auth)
        }
    },
    extraReducers: builder => builder
        .addMatcher(publicApi.endpoints.publicLogin.matchFulfilled, (state, { payload }) => {
            state.auth = payload
        })

})
export const { logout } = authApi.actions
export default authApi.reducer