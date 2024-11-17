// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import  authReducer from "@/features/auth/authSlice"
import practiseTestReducer from "@/features/practise/practiseSlice"
import typingTestResultsSlice from '@/features/result/resultSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    practiseTest: practiseTestReducer,
    typingTestResults: typingTestResultsSlice
  },
});

export default store;
