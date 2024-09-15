import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"], // Invalidates order cache on creation
    }),
    getUserOrders: builder.query({
      query: () => "/order/user",
      providesTags: ["Orders"], // Cache tag for orders
    }),
    getOrderById: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: ["Orders"], // Cache tag for specific order
    }),
    getAllOrders: builder.query({
      query: () => "/order",
      providesTags: ["Orders"], // Cache tag for all orders
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Orders"], // Invalidates order cache on update
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
