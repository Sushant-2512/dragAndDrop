import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MovieApi = createApi({
  reducerPath: "MovieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["movies"],

  endpoints: (builder) => ({
    getMovieList: builder.query({
      query: (id: number) => `movies/${id}`,
      providesTags: ["movies"],
    }),

    deleteMovie: builder.mutation({
      query: ({ id, details }) => ({
        url: `movies/${id}`,
        method: "DELETE",
        body: details,
      }),
      invalidatesTags: ["movies"],
    }),

    deleteList: builder.mutation({
      query: (id: number) => ({
        url: `list/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["movies"],
    }),

    postMovieOver: builder.mutation({
      query: ({ id, overId, details }) => ({
        url: `movies/${id}`,
        method: "POST",
        body: { overId, details },
      }),
      invalidatesTags: ["movies"],
    }),

    pushMovie: builder.mutation({
      query: ({ id, details }) => ({
        url: `movies/push/${id}`,
        method: "POST",
        body: details,
      }),
      invalidatesTags: ["movies"],
    }),
  }),
});

export const {
  useGetMovieListQuery,
  useDeleteMovieMutation,
  useDeleteListMutation,
  usePostMovieOverMutation,
  usePushMovieMutation,
} = MovieApi;
