import { createSlice } from "@reduxjs/toolkit";
import { getAllListing } from "./api/asynthunk/listingAsyncThunk";

type listingType = {
  listingLoading: boolean;
  listItems: any[];
  error: string | null;
};

const initialState: listingType = {
  listingLoading: false,
  listItems: [],
  error: null,
};

const listSlice = createSlice({
  name: "listSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getAllListing.pending, (state: any) => {
      //set the loading to true
      state.listingLoading = true;
    });
    builder.addCase(getAllListing.fulfilled, (state: any, action: any) => {
      //set the auth status to true
      state.listItems = action.payload;
      state.listingLoading = false;
    });
    builder.addCase(getAllListing.rejected, (state: any, action: any) => {
      // set the loader to false with error message
      state.listingLoading = false;
      state.error = action.error.message || "Failed to authenticate";
    });
  },
});

export default listSlice.reducer;
