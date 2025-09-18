import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "./api/asynthunk/userInfoAsyncThunk";
import type { UserInfo } from "../../types/userInfoSchem";

type userInfoState = {
  userInfo: UserInfo | null;
  userInfoLoading: boolean;
  error: string | null;
  hasDataFetched: boolean;
};

const initialState: userInfoState = {
  userInfo: null,
  userInfoLoading: false,
  error: null,
  hasDataFetched: false,
};

const userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState,
  reducers: {
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.error = null;
      state.hasDataFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.userInfoLoading = true;
      state.error = null;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.userInfoLoading = false;
      state.error = null;
      state.hasDataFetched = true;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.userInfoLoading = false;
      state.error = action.error.message || "Failed to get user info";
      state.hasDataFetched = true;
    });
  },
});

export const { clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
