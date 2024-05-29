import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ErrorResponse } from 'react-router-dom';

export interface ResponseErrorType extends ErrorResponse {
  status: number;
  data: {
    message: string;
  };
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      // LOGIN
      login: builder.mutation({
        query: ({ email, password }) => ({
          url: '/auth/login',
          method: 'POST',
          body: {
            email,
            password,
          },
        }),
      }),

      // SIGNUP
      signup: builder.mutation({
        query: ({ email, name, phone, password }) => ({
          url: '/auth/signup',
          method: 'POST',
          body: {
            email,
            password,
            name,
            phone,
          },
        }),
      }),

      // LIST USERS
      fetchUsers: builder.query({
        query: ({ role }) => `/users${role ? `?role=${role}` : ''}`,
      }),

      // CREATE USERS
      createUser: builder.mutation({
        query: ({ email, firstName, lastName, institutionId, phone, role }) => ({
          url: '/users',
          method: 'POST',
          body: {
            email,
            firstName,
            phone,
            role,
            institutionId,
            lastName,
          },
        }),
      }),

      // FETCH INSTITUTIONS
      fetchInstitutions: builder.query({
        query: ({ categoryId }) => `/institutions${categoryId ? `?categoryId=${categoryId}` : ''}`,
      }),

      // CREATE INSTITUTION
      createInstitution: builder.mutation({
        query: ({ categoryId, email, name, phone }) => ({
          url: '/institutions',
          method: 'POST',
          body: {
            categoryId,
            email,
            name,
            phone,
          },
        }),
      }),

      // FETCH CATEGORIES
      fetchCategories: builder.query({
        query: () => '/categories',
      }),
    };
  },
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLazyFetchUsersQuery,
  useLazyFetchInstitutionsQuery,
  useCreateUserMutation,
  useLazyFetchCategoriesQuery,
  useCreateInstitutionMutation,
} = apiSlice;
export default apiSlice;
