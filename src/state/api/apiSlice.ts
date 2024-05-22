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
      listUsers: builder.query({
        query: ({ role }) => `/users?role=${role}`,
      }),
    };
  },
});

export const { useLoginMutation, useSignupMutation, useLazyListUsersQuery } =
  apiSlice;
export default apiSlice;