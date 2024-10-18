import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("accessToken") || null,
    user: JSON.parse(localStorage.getItem("user-data")!) || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("accessToken", action.payload);
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user-data", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user-data");
        },
    },
});

export const { logout, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
