import { configureStore } from '@reduxjs/toolkit';

import { filterSlice } from './filterSlice';

import { contactApi } from './contact.slice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        [contactApi.reducerPath]: contactApi.reducer,
        filter: filterSlice.reducer,
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(contactApi.middleware),
});

setupListeners(store.dispatch);
