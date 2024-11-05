import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the user's slice of the store.
interface LoadingState {
  authLoading: boolean;

  // Add other user-specific fields here as needed
  // e.g. name: string;
}

// Define the initial state
const initialState: LoadingState = {
  authLoading: false,
};

// Create a "slice" of the state with reducers to handle user actions.
const loadingSlice = createSlice({
  name: "loading", // The name of the slice used in action types
  initialState, // The initial state defined above
  reducers: {
    // Reducer to handle login action
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload;
    },
  },
});

// Export actions to be used with dispatch in React components
export const { setAuthLoading } = loadingSlice.actions;

// Export the reducer to be included when creating the Redux store
export default loadingSlice.reducer;
