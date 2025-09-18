import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthStatusApi } from "../apiCall/getAuthStatus";

export const getAuthStatus = createAsyncThunk("getAuthStatus", async () => {
  return await getAuthStatusApi();
});
