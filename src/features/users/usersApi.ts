import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const usersApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "users",
      providesTags: ["Users"],
    }),
  }),
});
export const { useGetAllUsersQuery } = usersApi;
