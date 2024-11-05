import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the user's slice of the store.
interface UserDetails {
  _id?: string;
  email?: string;
  deleted?: boolean;
  subscription?: {
    name?: string;
    total?: number;
    remain?: number;
    plan?: number;
  };
  // Add other user-specific fields here as needed
  // e.g. name: string;
}

interface UserState {
  isAuthenticated: boolean; // Boolean flag for authentication status
  token: {
    accessToken: string;
    refreshToken: string;
  } | null; // Token to authenticate API requests
  userDetails: UserDetails | null; // Object to hold various user details
  users: UserDetails[]; // Array to hold multiple user details
}

// Define the initial state
const initialState: UserState = {
  isAuthenticated: false, // Boolean flag for authentication status
  token: null, // Token to authenticate API requests
  userDetails: null, // Object to hold various user details
  users: [], // Array to hold multiple user details
};

// Create a "slice" of the state with reducers to handle user actions.
const userSlice = createSlice({
  name: "user", // The name of the slice used in action types
  initialState, // The initial state defined above
  reducers: {
    // Reducer to handle login action
    login: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      // Set user as authenticated and store token
      state.isAuthenticated = true;
      state.token = action.payload; // Store the token
      localStorage.setItem("accessToken", action.payload.accessToken); // Persist token to local storage
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    // Reducer to handle logout action
    logout: (state) => {
      state.isAuthenticated = false; // Reset isAuthenticated
      state.token = null; // Clear token
      localStorage.removeItem("accessToken"); // Remove token from local storage
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      state.userDetails = null; // Reset user details
    },
    // Reducer to set user details

    setUsers: (state, action: PayloadAction<UserDetails[]>) => {
      state.users = action.payload;
    },
    deleteUser: (state, action: PayloadAction<UserDetails>) => {
      state.users = state.users.map((user) =>
        user._id === action.payload._id
          ? { ...user, deleted: action.payload.deleted }
          : user
      );
    },
    setUserDetails: (state, action) => {
      localStorage.setItem("userId", action.payload._id);
      state.userDetails = action.payload; // Set user details with payload data
      state.isAuthenticated = true;
    },
    undoDeleteUser: (state, action: PayloadAction<UserDetails>) => {
      state.users = state.users.map((user) =>
        user._id === action.payload._id
          ? { ...user, deleted: action.payload.deleted }
          : user
      );
    },
  },
});

// Export actions to be used with dispatch in React components
export const {
  login,
  logout,
  setUsers,
  deleteUser,
  undoDeleteUser,
  setUserDetails,
} = userSlice.actions;

// Export the reducer to be included when creating the Redux store
export default userSlice.reducer;
