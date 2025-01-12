import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IDashboardResponse,
  IGeographyResponse,
  IProductResponse,
  ISaleResponse,
  ITransactionResponse,
  IUser,
  IUserPerformanceResponse,
  IUserResponse,
} from '../../_interfaces';

const baseURI = import.meta.env.VITE_BASE_URI;

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
    'products',
  ], // Define tag types used for caching
  endpoints: (builder) => ({
    // Get user
    getUser: builder.query<IUser, string>({
      query: (userId) => `/api/v1/users/${userId}`,
      providesTags: ['user'], // Cache invalidation tag
    }),
    // Get user performance
    getUserPerformance: builder.query<IUserPerformanceResponse, string>({
      query: (userId) => `/api/v1/users/${userId}/performance`,
      providesTags: ['user_performance'], // Cache invalidation tag
    }),
    // Get dashboard
    getDashboard: builder.query<IDashboardResponse, void>({
      query: () => `/api/v1/users/dashboard`,
      providesTags: ['dashboard'], // Cache invalidation tag
    }),
    // Get location
    getUserLocations: builder.query<IGeographyResponse, void>({
      query: () => `/api/v1/users/location`,
      providesTags: ['location'], // Cache invalidation tag
    }),
    // Get customers
    getCustomers: builder.query<IUserResponse, void>({
      query: () => `/api/v1/users/customers`,
      providesTags: ['customers'], // Cache invalidation tag
    }),
    // Get admins
    getAdmins: builder.query<IUserResponse, void>({
      query: () => `/api/v1/users/admins`,
      providesTags: ['admins'], // Cache invalidation tag
    }),
    // Get sales
    getSales: builder.query<ISaleResponse, void>({
      query: () => `/api/v1/sales`,
      providesTags: ['sales'], // Cache invalidation tag
    }),
    // Get transactions
    // getTransactions: builder.query<ITransactionResponse, void>({
    //   query: () => `/api/v1/transactions`,
    //   providesTags: ['transactions'], // Cache invalidation tag
    // }),
    getTransactions: builder.query<
      ITransactionResponse,
      { page: number; pageSize: number; sort: string; search: string }
    >({
      query: ({ page, pageSize, sort, search }) =>
        `/api/v1/transactions?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${search}`,
      providesTags: ['transactions'], // Cache invalidation tag
    }),
    // Get products
    getProducts: builder.query<IProductResponse, void>({
      query: () => `/api/v1/products`,
      providesTags: ['products'], // Cache invalidation tag
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
  useGetProductsQuery,
} = apiSlice;

export default apiSlice;
