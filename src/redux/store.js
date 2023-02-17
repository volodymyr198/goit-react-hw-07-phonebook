import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { contactsSlice } from './contactsSlice';
import { filterSlice } from './filterSlice';

const rootReducer = combineReducers({
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        });
    },
});

export const persistor = persistStore(store);
