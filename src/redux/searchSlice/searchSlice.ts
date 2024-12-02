import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const searchSlice = createApi({
  reducerPath: 'searchSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/c/',
  }),

  tagTypes: ['Profiles'],
  endpoints: builder => ({
    fetchData: builder.query<any, string>({
      query: endpoint => endpoint,
      providesTags: result =>
        result ? [{ type: 'Profiles', id: 'LIST' }] : [],
    }),

    deleteUser: builder.mutation<void, string>({
      query: userId => ({
        url: `profile/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Profiles', id: 'LIST' }],
    }),

    updateUserName: builder.mutation<void, { userId: string; newName: string }>(
      {
        query: ({ userId, newName }) => ({
          url: `users/${userId}`,
          method: 'PATCH',
          body: { realName: newName },
        }),
        invalidatesTags: [{ type: 'Profiles', id: 'LIST' }],
      },
    ),

    getUser: builder.query<any, void>({
      query: () => ({
        url: '343b-beae-4fd5-a859',
        method: 'GET',
      }),
      providesTags: result =>
        result ? [{ type: 'Profiles', id: 'LIST' }] : [],
    }),
  }),
});

export const {
  useFetchDataQuery,
  useDeleteUserMutation,
  useUpdateUserNameMutation,
  useGetUserQuery,
} = searchSlice;

export default searchSlice;
