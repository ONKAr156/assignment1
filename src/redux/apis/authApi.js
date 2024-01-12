import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firbase';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          return { data: userCredential.user };
        } catch (error) {
          console.error('Login failed:', error);
          return { error: error.message };
        }
      },
    }),
    loginWithGoogle: builder.mutation({
      queryFn: async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          return { data: result.user };
        } catch (error) {
          console.error('Google login failed:', error);
          return { error: error.message };
        }
      },
    }),
    register: builder.mutation({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          return { data: userCredential.user };
        } catch (error) {
          console.error('Registration failed:', error);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLoginWithGoogleMutation, useRegisterMutation } = authApi;