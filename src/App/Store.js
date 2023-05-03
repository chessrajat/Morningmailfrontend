import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Api/ApiSlice";
import authReducer from "../Components/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
