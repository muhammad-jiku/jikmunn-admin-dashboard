import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../_interfaces';

const baseURI = import.meta.env.VITE_BASE_URI;

console.log(baseURI);

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  tagTypes: ['user'], // Define tag types used for caching
  endpoints: (builder) => ({
    // Get user
    getUser: builder.query<IUser, string>({
      query: (userId) => `/api/v1/users/${userId}`,
      providesTags: ['user'], // Cache invalidation tag
    }),
  }),
});

export const { useGetUserQuery } = apiSlice;

export default apiSlice;
