import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer"
import userInfoReducer from "./reducers/userInfoReducer"

const store = configureStore({
    reducer:{
        authReducer: authReducer,
        userInfoReducer:userInfoReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // ✅ Export this