/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Ensure you use the correct authorization scheme
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Product", "Orders", "Reviews"],
  endpoints: () => ({}),
});
