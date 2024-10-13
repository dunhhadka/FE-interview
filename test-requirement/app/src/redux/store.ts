import {configureStore} from '@reduxjs/toolkit'
import { authReducer, userReducer } from './authSlice';
import { adminApi } from '../api/api';

const store = configureStore({
     reducer: {
          auth: authReducer,
          user: userReducer,
          [adminApi.reducerPath]: adminApi.reducer,
     },
     middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(adminApi.middleware),
}) 

export default store;
export type AppDispatch = typeof store.dispatch;