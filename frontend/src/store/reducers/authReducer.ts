import { createSlice } from "@reduxjs/toolkit";
import { getAuthStatus } from "./api/asynthunk/authAsyncThunk";

type authState = {
  isAuthenticate: boolean;
  loading: boolean;
  error: string | null;
  isAuthCardVisible: boolean;
};
const initialState: authState = {
  isAuthenticate: false,
  loading: false,
  error: null,
  isAuthCardVisible: false
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthCardVisible: (state,action)=>{
      state.isAuthCardVisible = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthStatus.pending, (state) => {
      //set the loading to true
      state.loading = true;
    });
    builder.addCase(getAuthStatus.fulfilled, (state) => {
      //set the auth status to true
      state.isAuthenticate = true;
      state.loading = false;
    });
    builder.addCase(getAuthStatus.rejected, (state, action) => {
      // set the loader to false with error message
      state.loading = false;
      state.error = action.error.message || "Failed to authenticate";
    });
  },
});

export const { setAuthCardVisible } = authSlice.actions;
export default authSlice.reducer;
