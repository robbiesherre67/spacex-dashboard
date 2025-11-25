// Purpose: Centralized state manager for launches.
// This handles ALL launch data!!!
// Why a slice?
// - Encapsulates API calls
// - Provides global state
// - Enables loading + error UX
// - Makes app feel "full-stack" even though client-side only

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLaunches } from "../../api/spacexApi";

// Async thunk: handles API call automatically
export const getLaunches = createAsyncThunk(
  "launches/getLaunches",
  async () => {
    const response = await fetchLaunches();
    return response.data;
  }
);

const launchesSlice = createSlice({
  name: "launches",
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLaunches.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLaunches.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getLaunches.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to load launches";
      });
  }
});

export default launchesSlice.reducer;
