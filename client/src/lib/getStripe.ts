import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;
// const API_KEY = import.meta.env.VITE_STRIPE_PUBLISH_KEY;
const API_KEY = "pk_test_vXECXDSC7dTbgxM57Cqo0pHo005fOZrFpZ";
// console.log("API_KEY ==>", API_KEY);
const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = await loadStripe(API_KEY || "");
  }
  return stripePromise;
};

export default getStripe;
