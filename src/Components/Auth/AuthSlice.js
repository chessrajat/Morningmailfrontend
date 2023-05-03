import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAccessToken: (state, { payload }) => {
      const { accessToken, refreshToken } = payload;
      state.token = accessToken;
      localStorage.setItem("refresh", refreshToken);
    },
    logOut: (state, { payload }) => {
      state.token = null;
      localStorage.removeItem("refresh");
    },
  },
});

const { actions, reducer } = authSlice;

export const { setAccessToken, logOut } = actions;
export default reducer;
