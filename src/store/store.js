// Purpose: Create the global Redux store.
// Why Redux Toolkit?
// - Industry-standard
// - Handles complex state
// - Perfect for large SPAs
// - Senior-level pattern

import { configureStore } from "@reduxjs/toolkit";
import launchesReducer from "../features/launches/launchesSlice";

export const store = configureStore({
  reducer: {
    launches: launchesReducer
  }
});