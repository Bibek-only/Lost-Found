import { createSlice } from "@reduxjs/toolkit";
import { getAllListing } from "./api/asynthunk/listingAsyncThunk";

type listingType = {
  listingLoading: boolean;
  listItems: any[];
  error: string | null;
  lastFetched: number | null; // Track when data was last fetched
};

const initialState: listingType = {
  listingLoading: false,
  listItems: [],
  error: null,
  lastFetched: null,
};

const listSlice = createSlice({
  name: "listSlice",
  initialState,
  reducers: {
    // Action to invalidate cache and force refresh
    invalidateListingCache: (state) => {
      state.lastFetched = null;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(getAllListing.pending, (state: any) => {
      state.listingLoading = true;
    });
    builder.addCase(getAllListing.fulfilled, (state: any, action: any) => {
      state.listItems = action.payload;
      state.listingLoading = false;
      state.lastFetched = Date.now(); // Track fetch time
    });
    builder.addCase(getAllListing.rejected, (state: any, action: any) => {
      state.listingLoading = false;
      state.error = action.error.message || "Failed to fetch listings";
    });
  },
});

export const { invalidateListingCache } = listSlice.actions;
export default listSlice.reducer;
