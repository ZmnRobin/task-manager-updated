import { configureStore } from '@reduxjs/toolkit';
import { taskApiSlice } from '../features/apiSlice';
import filterReducer from '../features/filterSlice'

export const store = configureStore({
  reducer: {
    [taskApiSlice.reducerPath]:taskApiSlice.reducer,
    filter:filterReducer,

  },
  middleware:(getDefaultMiddlewares)=>getDefaultMiddlewares().concat(taskApiSlice.middleware),
});