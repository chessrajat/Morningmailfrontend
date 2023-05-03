import { apiSlice } from "./ApiSlice";

export const authApi = apiSlice.injectEndpoints({
  tagtypes: [],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (creds) => ({
        url: "/user/register/",
        method: "POST",
        body: creds,
      }),
    }),
    login: builder.mutation({
      query: (creds) => ({
        url: "/user/token/",
        method: "POST",
        body: creds,
      }),
    }),
    logout: builder.mutation({
      query: (creds) => ({
        url: "/user/logout/",
        method: "POST",
        body: creds,
      }),
    }),
    validate: builder.mutation({
      query: (creds) => ({
        url: "/user/token/verify/",
        method: "POST",
        body: creds,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useValidateMutation, useLogoutMutation } =
  authApi;
