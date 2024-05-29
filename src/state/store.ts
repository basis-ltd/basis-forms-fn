import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './api/apiSlice';
import sidebarSlice from './features/sidebarSlice';
import userSlice from './features/userSlice';
import paginationSlice from './features/paginationSlice';
import institutionSlice from './features/institutionSlice';
import categorySlice from './features/categorySlice';
import formSlice from './features/formSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    sidebar: sidebarSlice,
    user: userSlice,
    pagination: paginationSlice,
    institution: institutionSlice,
    category: categorySlice,
    form: formSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
