import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const postsApi = createApi({
  reducerPath: "variety",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "posts",
      providesTags: ["Posts"],
    }),
  }),
});
export const { useGetAllPostsQuery } = postsApi;
