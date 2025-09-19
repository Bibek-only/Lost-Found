import { createSlice } from "@reduxjs/toolkit";
import { submitPortalEntry } from "./api/asynthunk/portalEntryAsyncThunk";

// Portal entry state type definition
type PortalEntryState = {
  isSubmitting: boolean;
  submitSuccess: boolean;
  error: string | null;
  validationErrors: any[];
};

// Initial state for portal entry
const initialState: PortalEntryState = {
  isSubmitting: false,
  submitSuccess: false,
  error: null,
  validationErrors: [],
};

// Portal entry slice with reducers
const portalEntrySlice = createSlice({
  name: "portalEntry",
  initialState,
  reducers: {
    // Reset portal entry state
    resetPortalEntryState: (state) => {
      state.isSubmitting = false;
      state.submitSuccess = false;
      state.error = null;
      state.validationErrors = [];
    },
    // Clear only errors
    clearPortalEntryErrors: (state) => {
      state.error = null;
      state.validationErrors = [];
    },
  },
  extraReducers: (builder) => {
    // Handle portal entry submission pending state
    builder.addCase(submitPortalEntry.pending, (state) => {
      state.isSubmitting = true;
      state.submitSuccess = false;
      state.error = null;
      state.validationErrors = [];
    });

    // Handle successful portal entry submission
    builder.addCase(submitPortalEntry.fulfilled, (state) => {
      state.isSubmitting = false;
      state.submitSuccess = true;
      state.error = null;
      state.validationErrors = [];
    });

    // Handle failed portal entry submission
    builder.addCase(submitPortalEntry.rejected, (state, action: any) => {
      state.isSubmitting = false;
      state.submitSuccess = false;
      state.error = action.payload?.message || "Portal entry failed";
      state.validationErrors = action.payload?.errors || [];
    });
  },
});

export const { resetPortalEntryState, clearPortalEntryErrors } =
  portalEntrySlice.actions;
export default portalEntrySlice.reducer;
