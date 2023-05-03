import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccessToken } from "../Components/Auth/AuthSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/v1",
  credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const refreshToken = localStorage.getItem("refresh") || "";
  if (result?.error?.status === 401) {
    // send refresh token
    const refreshResult = await baseQuery(
      {
        url: "/user/token/refresh/",
        method: "POST",
        body: { refresh: refreshToken },
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      api.dispatch(setAccessToken({ accessToken: refreshResult.data.access }));
      //retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 401) {
        refreshResult.error.data.message = "Your Login has expired. ";
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
