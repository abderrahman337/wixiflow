import myAxios from "../lib/customAxios";
import { AppDispatch } from "../store/store";
import { setPayment } from "../reducers/paymentSlice";
const createPaymentIntent = async (
  amount: number | undefined,
  currency: string = "usd"
) => {
  try {
    const response = await myAxios.post("/api/payment/create-payment-intent", {
      amount,
      currency,
    });
    const { clientSecret } = response.data;
    console.log("clientSecret==>", clientSecret);
    return clientSecret;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

const updatePayment =
  ({ name, price, total }: { name: string; price: number; total: number }) =>
  (dispatch: AppDispatch) => {
    dispatch(setPayment({ name, price, total }));
  };

export { createPaymentIntent, updatePayment };
