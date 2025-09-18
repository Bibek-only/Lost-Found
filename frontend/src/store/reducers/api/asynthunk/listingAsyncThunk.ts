import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllListingApi } from "../apiCall/getAllListing.js";

export const getAllListing = createAsyncThunk("getAllListing", async () => {
  return await getAllListingApi();
});
