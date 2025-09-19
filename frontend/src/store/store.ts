import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import userInfoReducer from "./reducers/userInfoReducer";
import listingReducer from "./reducers/listingReducer";
import portalEntryReducer from "./reducers/portalEntryReducer";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    userInfoReducer: userInfoReducer,
    listingReducer,
    portalEntryReducer, // Add portal entry reducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
