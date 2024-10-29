/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://posh-foods-server.vercel.app/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Product", "Orders", "Reviews"],
  endpoints: () => ({}),
});
