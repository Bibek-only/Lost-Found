import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfoApi } from "../apiCall/getuserInfo";

export const getUserInfo = createAsyncThunk("getUserInfo", async () => {
  return await getUserInfoApi();
});

