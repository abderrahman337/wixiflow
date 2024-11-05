import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the user's slice of the store.
interface WorkspaceState {
  user?: string;
  name?: string;
}

// Define the initial state
const initialState: WorkspaceState = {
  name: "",
  user: "",
};

// Create a "slice" of the state with reducers to handle user actions.
const workspaceSlice = createSlice({
  name: "workspace", // The name of the slice used in action types
  initialState, // The initial state defined above
  reducers: {
    // Reducer to handle login action
    setWorkspace: (
      state,
      action: PayloadAction<{
        user: string | undefined;
        name: string | undefined;
      }>
    ) => {
      state.user = action.payload.user;
      state.name = action.payload.name;
    },
  },
});

// Export actions to be used with dispatch in React components
export const { setWorkspace } = workspaceSlice.actions;

// Export the reducer to be included when creating the Redux store
export default workspaceSlice.reducer;
