import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/auth.slice'
import aiReducer from '../features/ai/ai.slice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        ai:aiReducer
    },
})