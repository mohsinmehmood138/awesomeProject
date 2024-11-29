import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const apiSlice = createApi({


  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://67487a0a5801f5153591121f.mockapi.io/data/',
  }),



  tagTypes: ['Users'],
  endpoints: (builder) => ({
    fetchData: builder.query<any, string>({
      query: (endpoint) => endpoint,
      providesTags: (result) => (result ? [{ type: 'Users', id: 'LIST' }] : []),
    }),


    createUser: builder.mutation<void, { name: string; password: string; email: string }>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),


    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),


    updateUserName: builder.mutation<void, { userId: string; newName: string }>({
      query: ({ userId, newName }) => ({
        url: `users/${userId}`,
        method: 'PATCH',
        body: { realName: newName },
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),



    getUser: builder.query<any, void>({
      query: () => ({
        url: 'users',
        method: 'GET',
      }),
      providesTags: (result) => (result ? [{ type: 'Users', id: 'LIST' }] : []),
    })
  }),
});

export const {
  useFetchDataQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserNameMutation,
  useGetUserQuery,
} = apiSlice;

export default apiSlice;
