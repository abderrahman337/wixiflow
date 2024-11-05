import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the user's slice of the store.
// interface AuthErrors {
//   email?: string;
//   password?: string;
//   // Add other user-specific fields here as needed
//   // e.g. name: string;
// }

// interface ErrorsState {
//   authErrors: AuthErrors;
// }

// Define the initial state
const initialState = {
  authErrors: {
    email: "",
    password: "",
  },
};

// Create a "slice" of the state with reducers to handle user actions.
const errorSlice = createSlice({
  name: "error", // The name of the slice used in action types
  initialState, // The initial state defined above
  reducers: {
    // Reducer to handle login action
    setAuthErrors: (
      state,
      action: PayloadAction<{
        password: string;
        email: string;
      }>
    ) => {
      // Set auth errors
      state.authErrors = {
        email: action.payload.email || "",
        password: action.payload.password || "",
      };
    },
    // Reducer to handle logout action
    clearAuthErrors: (state) => {
      state.authErrors = {
        email: "",
        password: "",
      };
    },
  },
});

// Export actions to be used with dispatch in React components
export const { setAuthErrors, clearAuthErrors } = errorSlice.actions;

// Export the reducer to be included when creating the Redux store
export default errorSlice.reducer;
