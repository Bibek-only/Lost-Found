import { createAsyncThunk } from "@reduxjs/toolkit";
import { portalEntryApi } from "../apiCall/portalEntry";
import type{ PortalEntryFormData } from "../schema/portalEntrySchema";

// Async thunk for portal entry submission
export const submitPortalEntry = createAsyncThunk(
  "portalEntry/submit",
  async (data: PortalEntryFormData, { rejectWithValue }) => {
    try {
      const response = await portalEntryApi(data);
      return response;
    } catch (error: any) {
      // Handle API errors and return structured error data
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "Portal entry failed",
          errors: error.response.data.error || [],
          statusCode: error.response.status,
        });
      }

      // Handle network or other errors
      return rejectWithValue({
        message: "Network error occurred. Please try again.",
        errors: [],
        statusCode: 500,
      });
    }
  }
);
