import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../_interfaces';

const baseURI = import.meta.env.VITE_BASE_URI;

// console.log(baseURI);

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  tagTypes: [
    'user',
    'user_performance',
    'dashboard',
    'location',
    'customers',
    'admins',
    'sales',
    'transactions',
  ], // Define tag types used for caching
  endpoints: (builder) => ({
    // Get user
    getUser: builder.query<IUser, string>({
      query: (userId) => `/api/v1/users/${userId}`,
      providesTags: ['user'], // Cache invalidation tag
    }),
    // Get user performance
    getUserPerformance: builder.query<IUser, string>({
      query: (userId) => `/api/v1/users/${userId}/performance`,
      providesTags: ['user_performance'], // Cache invalidation tag
    }),
    // Get dashboard
    getDashboard: builder.query<IUser, string>({
      query: () => `/api/v1/users/dashboard`,
      providesTags: ['dashboard'], // Cache invalidation tag
    }),
    // Get location
    getUserLocations: builder.query<IUser, string>({
      query: () => `/api/v1/users/location`,
      providesTags: ['location'], // Cache invalidation tag
    }),
    // Get customers
    getCustomers: builder.query<IUser, string>({
      query: () => `/api/v1/users/customers`,
      providesTags: ['customers'], // Cache invalidation tag
    }),
    // Get admins
    getAdmins: builder.query<IUser, string>({
      query: () => `/api/v1/users/admins`,
      providesTags: ['admins'], // Cache invalidation tag
    }),
    // Get sales
    getSales: builder.query<IUser, string>({
      query: () => `/api/v1/sales`,
      providesTags: ['sales'], // Cache invalidation tag
    }),
    // Get transactions
    getTransactions: builder.query<IUser, string>({
      query: () => `/api/v1/transactions`,
      providesTags: ['transactions'], // Cache invalidation tag
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useGetUserLocationsQuery,
  useGetCustomersQuery,
  useGetAdminsQuery,
  useGetSalesQuery,
  useGetTransactionsQuery,
} = apiSlice;

export default apiSlice;
