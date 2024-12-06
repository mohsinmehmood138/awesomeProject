import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const searchSlice = createApi({
  reducerPath: 'searchSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),

  tagTypes: ['Products'],
  endpoints: builder => ({
    fetchData: builder.query<any, string>({
      query: endpoint => endpoint,
      providesTags: result =>
        result ? [{ type: 'Products', id: 'LIST' }] : [],
    }),

    createUser: builder.mutation<void, []>({
      query: product => {
       
        return {
          url: 'product',
          method: 'POST',
          body: product,
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    deleteUser: builder.mutation<void, string>({
      query: userId => {
        // console.log('i am user===========>', userId);

        return {
          url: `users/${userId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    updateUserName: builder.mutation<void, { userId: string; newName: string }>(
      {
        query: ({ userId, newName }) => ({
          url: `products/${userId}`,
          method: 'PATCH',
          body: { realName: newName },
        }),
        invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      },
    ),

    getUser: builder.query<any, void>({
      query: () => ({
        url: `users/`,
        method: 'GET',
      }),
      providesTags: result =>
        result ? [{ type: 'Products', id: 'LIST' }] : [],
    }),
  }),
});

export const {
  useFetchDataQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserNameMutation,
  useGetUserQuery,
} = searchSlice;

export default searchSlice;
