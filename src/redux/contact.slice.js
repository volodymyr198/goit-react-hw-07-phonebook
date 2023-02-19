import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://63efc9a34d5eb64db0d118cb.mockapi.io',
    }),
    tagTypes: ['Contacts'],
    endpoints: builder => ({
        fetchContacts: builder.query({
            query: () => `/contacts`,
            providesTags: ['Contacts'],
        }),
        deleteContact: builder.mutation({
            query: id => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contacts'],
        }),
        addContact: builder.mutation({
            query: values => ({
                url: '/contacts',
                method: 'POST',
                body: values,
            }),
            invalidatesTags: ['Contacts'],
        }),
    }),
});

export const {
    useFetchContactsQuery,
    useDeleteContactMutation,
    useAddContactMutation,
} = contactApi;
