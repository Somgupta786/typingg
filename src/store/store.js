// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import  authReducer from "@/features/auth/authSlice"
import practiseTestReducer from "@/features/practise/practiseSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    practiseTest: practiseTestReducer,
  },
});

export default store;
