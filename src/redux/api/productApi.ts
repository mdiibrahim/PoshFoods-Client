import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return `/product${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => `/product/${id}`,
    }),
    getTopRatedProducts: builder.query({
      query: () => "/product/featured",
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetTopRatedProductsQuery,
} = productApi;
