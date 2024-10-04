// src/redux/api/auth/authApi.ts
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<
      void,
      {
        name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
      }
    >({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({ url: "/user/profile/", method: "GET" }),
      providesTags: ["User"],
    }),
    updateUserProfile: builder.mutation<
      void,
      { name: string; phone: string; address: string }
    >({
      query: (data) => ({
        url: "/user/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} = authApi;
