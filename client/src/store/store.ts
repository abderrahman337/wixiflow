import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice"; // Reducer for user-related state
import loadingReducer from "../reducers/loadingSlice"; // Reducer for loading-related state
import paymentReducer from "../reducers/paymentSlice"; // Reducer for payment-related state
import workspaceReducer from "../reducers/workspaceSlice"; // Reducer for workspace-related state
import appReducer from "../reducers/appSlice"; // Reducer for app-related state
// Configure the Redux store
const store = configureStore({
  reducer: {
    user: userReducer, // Connects userReducer to the 'user' state slice
    loading: loadingReducer, // Connects loadingReducer to the 'loading' state slice
    payment: paymentReducer, // Connects paymentReducer to the 'payment' state slice
    workspace: workspaceReducer, // Connects workspaceReducer to the 'workspace' state slice
    app: appReducer, // Connects appReducer to the 'app' state slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([]), // Use concat to return a Tuple
  devTools: import.meta.env.NODE_ENV !== "production",
});

// Export the configured Redux store
export type RootState = ReturnType<typeof store.getState>; // Define RootState type
export type AppDispatch = typeof store.dispatch; // Define AppDispatch type

export default store;
