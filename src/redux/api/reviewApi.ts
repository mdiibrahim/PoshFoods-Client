import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (id) => `/review/${id}`,
      providesTags: ["Reviews"],
    }),
    addReview: builder.mutation({
      query: (newReview) => ({
        url: "/review",
        method: "POST",
        body: newReview,
      }),

      invalidatesTags: ["Reviews"],
    }),
    getTestimonials: builder.query({
      query: () => "/review",
      providesTags: ["Reviews"],
    }),
    getUserReviews: builder.query({
      query: () => "/review/user",
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useAddReviewMutation,
  useGetTestimonialsQuery,
  useGetUserReviewsQuery,
} = reviewApi;
