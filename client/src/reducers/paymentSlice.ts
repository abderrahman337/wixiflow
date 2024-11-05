import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the user's slice of the store.
interface PaymentState {
  name?: string;
  price?: number;
  total?: number;
}

// Define the initial state
const initialState: PaymentState = {
  name: "",
  price: 0,
  total: 0,
};

// Create a "slice" of the state with reducers to handle user actions.
const paymentSlice = createSlice({
  name: "payment", // The name of the slice used in action types
  initialState, // The initial state defined above
  reducers: {
    // Reducer to handle login action
    setPayment: (
      state,
      action: PayloadAction<{ name: string; price: number; total: number }>
    ) => {
      state.price = action.payload.price;
      state.name = action.payload.name;
      state.total = action.payload.total;
    },
  },
});

// Export actions to be used with dispatch in React components
export const { setPayment } = paymentSlice.actions;

// Export the reducer to be included when creating the Redux store
export default paymentSlice.reducer;
