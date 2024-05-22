import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './api/apiSlice';
import sidebarSlice from './features/sidebarSlice';
import userSlice from './features/userSlice';
import paginationSlice from './features/paginationSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    sidebar: sidebarSlice,
    user: userSlice,
    pagination: paginationSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
